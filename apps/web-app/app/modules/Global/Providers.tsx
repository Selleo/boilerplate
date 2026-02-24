import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "../Theme/ThemeProvider";
import { queryClient } from "../../api/queryClient";
import i18next, { getSavedLanguage, setLanguage } from "~/lib/i18n";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedLanguage = getSavedLanguage();

    if (savedLanguage) {
      setLanguage(savedLanguage);
      return;
    }

    document.documentElement.lang = i18next.resolvedLanguage ?? "en";
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
