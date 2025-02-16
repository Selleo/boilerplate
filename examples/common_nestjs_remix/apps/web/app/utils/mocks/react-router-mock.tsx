import { PropsWithChildren } from "react";
import { vi } from "vitest";

export const mockedUseNavigate = vi.fn();

export function mockReactRouter() {
  return vi.mock("react-router", async (importOriginal) => {
    const original = await importOriginal<typeof import("react-router")>();
    return {
      ...original,
      useNavigate: () => mockedUseNavigate,
      Link: ({ to, children }: PropsWithChildren<{ to: string }>) => (
        <a href={to}>{children}</a>
      ),
    };
  });
}
