import { createRoutesStub } from "react-router";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWith } from "~/tests/test-renderers";
import LoginPage from "./Auth.page";

describe("Auth Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Stub = createRoutesStub(
    [
      {
        path: "/auth",
        Component: LoginPage,
      },
    ],
    {}
  );

  it("renders without crashing", () => {
    renderWith({ withQuery: true }).render(<Stub initialEntries={["/auth"]} />);

    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: "Login" })).toBeDefined();
  });

  it("shows login form and is typable", async () => {
    renderWith({ withQuery: true }).render(<Stub initialEntries={["/auth"]} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
  });
  it("switches to sign up form", async () => {
    renderWith({ withQuery: true }).render(<Stub initialEntries={["/auth"]} />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      screen.getByRole("heading", { name: "Create your account" })
    ).toBeDefined();
    expect(screen.getByLabelText("Username")).toBeVisible();
    expect(screen.getByLabelText("Email")).toBeVisible();
    expect(screen.getByLabelText("Password")).toBeVisible();
    expect(screen.getByLabelText("Confirm password")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Create account" })
    ).toBeVisible();

    await user.type(screen.getByLabelText("Username"), "testuser");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm password"), "password123");
  });
});
