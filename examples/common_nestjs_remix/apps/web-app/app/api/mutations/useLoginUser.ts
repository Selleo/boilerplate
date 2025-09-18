import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "~/modules/Auth/authStore";
import { authClient } from "~/modules/Auth/auth.client";

type LoginUserOptions = {
  data: {
    email: string;
    password: string;
  };
};

export function useLoginUser() {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  return useMutation({
    mutationFn: async (options: LoginUserOptions) => {
      const response = await authClient.signIn.email({
        email: options.data.email,
        password: options.data.password,
      });

      if (response.error) {
        throw new Error(response.error.message, {
          cause: response.error,
        });
      }

      return response.data;
    },
    onSuccess: () => {
      setLoggedIn(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
