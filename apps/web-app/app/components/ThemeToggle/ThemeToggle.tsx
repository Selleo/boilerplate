import { useThemeStore } from "~/modules/Theme/themeStore";
import { Button } from "../ui/button";
import type { ComponentProps } from "react";

import { type LucideProps, Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

export default function ThemeToggle({ className, variant = "ghost" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeStore();

  const ToggleIcon = (props: LucideProps) => {
    switch (theme) {
      case "light":
        return <Sun aria-label="Switch to lightmode" {...props} />;
      case "dark":
        return <Moon aria-label="Switch to darkmode" {...props} />;
      default:
        return <Sun aria-label="Switch to lightmode" {...props} />;
    }
  };

  return (
    <Button variant={variant} className={className} onClick={toggleTheme}>
      <ToggleIcon className="h-5 w-5" />
    </Button>
  );
}
