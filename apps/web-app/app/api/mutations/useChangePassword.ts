import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { authClient } from "~/modules/Auth/auth.client";

type ChangePasswordOptions = {
  data: {
    currentPassword: string;
    newPassword: string;
  };
};

export function useChangePassword() {
  return useMutation({
    mutationFn: async (options: ChangePasswordOptions) => {
      const response = await authClient.changePassword({
        currentPassword: options.data.currentPassword,
        newPassword: options.data.newPassword,
      });

      if (response.error) {
        throw new Error(response.error.message, {
          cause: response.error
        });
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error(error.message);
    }
  });
}
