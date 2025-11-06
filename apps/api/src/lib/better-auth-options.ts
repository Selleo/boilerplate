import { betterAuth, BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, createAuthMiddleware, openAPI } from "better-auth/plugins";
import type { DatabasePg } from "src/common";
import * as schema from "../storage/schema";

export type EnvGetter = (key: string) => string | undefined;

export type EmailSenderPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export type EmailSender = (payload: EmailSenderPayload) => Promise<void>;

export interface BuildBetterAuthOptionsParams {
  db: DatabasePg;
  env: EnvGetter;
  basePath?: string;
  plugins?: BetterAuthPlugin[];
  customize?: (options: BetterAuthOptions) => BetterAuthOptions;
  sendResetPasswordEmail: (
    to: string,
    data: {
      email: string;
      url: string;
      name: string;
    },
  ) => Promise<void>;
  sendWelcomeVerifyEmail: (
    to: string,
    data: {
      email: string;
      name: string;
      url: string;
    },
  ) => Promise<void>;
}

export const buildBetterAuthInstance = ({
  db,
  env,
  basePath,
  plugins,
  customize,
  sendResetPasswordEmail,
  sendWelcomeVerifyEmail,
}: BuildBetterAuthOptionsParams) => {
  const nodeEnv = env("NODE_ENV");
  const isDev = nodeEnv === "development";
  const isTest = nodeEnv === "test";

  const googleClientId = env("GOOGLE_CLIENT_ID");
  const googleClientSecret = env("GOOGLE_CLIENT_SECRET");

  if (!googleClientId) {
    throw new Error("GOOGLE_CLIENT_ID is not defined");
  }

  if (!googleClientSecret) {
    throw new Error("GOOGLE_CLIENT_SECRET is not defined");
  }

  const logLevel = env("LOG_LEVEL");
  const devSocial = env("DEV_SOCIAL") === "true";

  const defaultPlugins: BetterAuthPlugin[] = plugins ?? [openAPI(), admin()];

  let baseOptions: BetterAuthOptions = {
    basePath,
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        console.log(`[Auth][${ctx.method}] Incoming request: ${ctx.path}`);

        if (isDev && logLevel === "debug") {
          console.log(`[Auth][${ctx.method}] Headers:`, ctx.headers);
          if (ctx.method !== "GET") {
            console.log(
              `[Auth][${ctx.method}] Body:`,
              JSON.stringify(ctx.body),
            );
          }
        }
      }),
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: !isTest,
      async sendResetPassword(data) {
        await sendResetPasswordEmail(data.user.email, {
          url: data.url,
          name: data.user.name || "User",
          email: data.user.email,
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      async sendVerificationEmail({ user, url }) {
        await sendWelcomeVerifyEmail(user.email, {
          name: user.name || "User",
          url,
          email: user.email,
        });
      },
    },
    socialProviders: {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      },
    },
    advanced: devSocial
      ? undefined
      : {
          crossSubDomainCookies: {
            enabled: true,
            domain: "boilerplate.localhost",
          },
        },
    trustedOrigins: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "https://app.boilerplate.localhost",
    ],
    logger: {
      level: "debug",
      log(level, message, ...args) {
        console[level](message, ...args);
      },
    },
    plugins: defaultPlugins,
    telemetry: {
      enabled: false,
    },
  };

  if (customize) {
    baseOptions = customize(baseOptions);
  }

  return betterAuth(baseOptions);
};
