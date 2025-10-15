import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "~/modules/Auth/auth.client";

type ResetPasswordOptions = {
  data: {
    newPassword: string;
    token: string;
  };
};

export function useResetPassword() {
  return useMutation({
    mutationFn: async (options: ResetPasswordOptions) => {
      const response = await authClient.resetPassword({
        newPassword: options.data.newPassword,
        token: options.data.token
      });

      if (response.error) {
        throw new Error(response.error.message, {
          cause: response.error
        });
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Hasło zostało zmienione.");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}
