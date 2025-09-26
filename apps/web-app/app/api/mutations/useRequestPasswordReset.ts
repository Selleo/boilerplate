import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "~/modules/Auth/auth.client";

type RequestPasswordResetOptions = {
  data: {
    email: string;
  };
};

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (options: RequestPasswordResetOptions) => {
      const response = await authClient.requestPasswordReset({
        email: options.data.email,
        redirectTo: `${window.location.origin}/new-password`,
      });

      if (response.error) {
        throw new Error(response.error.message, {
          cause: response.error,
        });
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Sprawdź swoją skrzynkę pocztową, aby zresetować hasło.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
