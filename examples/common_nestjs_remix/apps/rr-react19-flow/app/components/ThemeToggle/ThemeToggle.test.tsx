import { describe, expect, it } from "vitest";
import { screen, fireEvent } from "@testing-library/react";

import ThemeToggle from "./ThemeToggle";
import { renderWith } from "~/tests/test-renderers";
import userEvent from "@testing-library/user-event";

describe("ThemeToggle", () => {
  it("renders without crashing", () => {
    renderWith({
      withTheme: true,
    }).render(<ThemeToggle />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles theme", async () => {
    renderWith({
      withTheme: true,
    }).render(<ThemeToggle />);

    const button = screen.getByRole("button");

    const user = userEvent.setup();

    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(await screen.findByLabelText(/dark/)).toBeInTheDocument();
    await user.click(button);
    expect(await screen.findByLabelText(/light/)).toBeInTheDocument();
  });
});
