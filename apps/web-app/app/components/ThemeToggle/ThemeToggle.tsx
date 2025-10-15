import { useThemeStore } from "~/modules/Theme/themeStore";
import { Button, type ButtonProps } from "../ui/button";

import { type LucideProps, Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  variant?: ButtonProps["variant"];
  className?: string;
};

export default function ThemeToggle({ className, variant = "ghost" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeStore();

  const ToggleIcon: React.FC<LucideProps> = (props) => {
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
