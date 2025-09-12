import { createRoutesStub } from "react-router";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  mockedUseNavigate,
} from "~/utils/mocks/react-router-mock";
import { renderWith } from "~/utils/testUtils";
import LoginPage from "./Login.page";



describe("Login page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: LoginPage,
    },
  ]);


  it("renders without crashing", () => {
    renderWith({ withQuery: true }).render(<Stub />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    renderWith({ withQuery: true }).render(<Stub  />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});
