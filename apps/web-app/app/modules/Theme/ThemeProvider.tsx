import { useEffect, type ReactNode } from "react";
import { useThemeStore } from "./themeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    switch (theme) {
      case "dark": {
        document.documentElement.classList.add("dark");
        break;
      }
      case "light": {
        document.documentElement.classList.remove("dark");
        break;
      }
      default: {
        // no-op (exhaustive guard)
      }
    }
  }, [theme]);

  return <>{children}</>;
}
