import { cn } from "./utils";
import { describe, expect, it } from "vitest";

describe("cn", () => {
  it("should merge class names correctly", () => {
    expect(cn("btn", "btn-primary")).toBe("btn btn-primary");
    expect(cn("btn", "btn-primary", "active")).toBe("btn btn-primary active");
  });

  it("should handle conditional class names", () => {
    expect(cn("btn", { "btn-primary": true, "btn-secondary": false })).toBe(
      "btn btn-primary"
    );
    expect(cn({ "btn-primary": false, "btn-secondary": true })).toBe("btn-secondary");
  });

  it("should merge Tailwind CSS classes correctly", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-center", "text-left")).toBe("text-left");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });
});
