---
name: github-pull-requests
description: Push branches and open pull requests on GitHub from this Replit environment. Use when the user asks to "create a PR", "open a pull request", "push to GitHub", or merge a feature branch via PR. Avoids the broken interactive `git push` flow by authenticating with the Replit GitHub connector token.
---

# GitHub Pull Requests

> **Scope:** This skill should only be used by the Replit Agent running inside a Replit environment. It depends on Replit-specific primitives (`listConnections`, the `code_execution` sandbox, the bash tool's output redactor, and the destructive-git guardrails) and will not work for other agents or outside Replit.

The bare `git push` command in this environment hangs (no interactive credential helper, no stored GitHub login) and the bash tool will time out. Use the GitHub connector access token to push and to create the PR via the REST API instead.

## Prerequisites

- A healthy `github` connection. Check with `listConnections('github')` in `code_execution`.
- If no connection exists, ask the user to add the GitHub integration (see the `integrations` skill) before continuing.

## Procedure

1. **Confirm state with read-only git** (always pass `--no-optional-locks`):
   ```bash
   git --no-optional-locks status
   git --no-optional-locks log --oneline -5
   git --no-optional-locks remote -v
   ```
   Capture the current branch, the target base (usually `main`), and the `owner/repo` from the `origin` URL.

2. **Make sure work is committed.** The push only sends committed history. If there are uncommitted changes, commit them first (`git commit` is allowed; force flags are not).

3. **Push using the connector token.** Run this from `code_execution` so the token never touches the shell history or your context. The bash tool's output redactor will mangle pushes that print the token, so always use `code_execution`:

   ```js
   const conns = await listConnections('github');
   const token = conns[0].settings.access_token;
   const { execSync } = await import('child_process');

   const BRANCH = 'feature-branch-name';
   const REPO   = 'owner/repo'; // from `git remote -v`

   const out = execSync(
     `git push https://x-access-token:${token}@github.com/${REPO}.git ${BRANCH}:${BRANCH} 2>&1`,
     { encoding: 'utf8', timeout: 60000 }
   );
   console.log('push ok, length:', out.length, 'has error:', /error|fatal|denied|reject/i.test(out));
   ```

   Notes:
   - Do **not** `console.log(out)` — git prints the remote URL with the token, which the redactor will then blank out and you will lose all signal. Log only length / error-regex like above.
   - Do **not** add the token to a persistent remote (`git remote set-url`) — it would be saved on disk.
   - Do **not** use force flags. If a non-fast-forward push is genuinely needed, delegate to a project task per the destructive-git rule.

4. **Verify the branch landed on GitHub** before opening the PR (saves a confusing 422):
   ```js
   const r = await fetch(`https://api.github.com/repos/${REPO}/branches/${BRANCH}`, {
     headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
   });
   const b = await r.json();
   console.log(r.status, b.commit?.sha);
   ```
   Expect `200` and a sha matching `git rev-parse HEAD`.

5. **Open the pull request via REST:**
   ```js
   const prRes = await fetch(`https://api.github.com/repos/${REPO}/pulls`, {
     method: 'POST',
     headers: {
       Authorization: `Bearer ${token}`,
       Accept: 'application/vnd.github+json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       title: 'Short imperative title',
       head: BRANCH,         // same-repo branch; use 'forkOwner:branch' for cross-repo
       base: 'main',
       body: 'What changed and why. Mention any follow-ups or screenshots.'
     })
   });
   const pr = await prRes.json();
   console.log(prRes.status, pr.html_url, pr.number);
   ```
   Success returns `201` with `pr.html_url`. Report that URL back to the user.

## Updating an existing PR

To push more commits to the same PR, just repeat step 3 with the same branch name — the open PR auto-updates. No second API call needed.

To edit the PR title/body/base, `PATCH https://api.github.com/repos/${REPO}/pulls/${number}`.

## Common failures

- **422 `head invalid`** → the branch is not on the remote yet. Re-run step 3 and verify with step 4.
- **403 / 404 from the API** → the connector token is missing `repo` scope or doesn't have access to that repo. Ask the user to reconnect GitHub with the right repo selected.
- **Push appears to hang** → you ran plain `git push` in bash. Cancel and use the `code_execution` flow above.
- **Output came back `[REDACTED: ... GitHub OAuth Token ...]`** → you printed the raw push output. Use the length / regex pattern in step 3 instead and re-verify with the API in step 4.
