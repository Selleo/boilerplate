import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../Theme/ThemeProvider";
import { queryClient } from "../../api/queryClient";
import { Toaster } from "~/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
