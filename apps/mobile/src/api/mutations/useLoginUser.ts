import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/modules/auth/auth-mobile.client";

type LoginUserOptions = {
  data: {
    email: string;
    password: string;
  };
};

export function useLoginUser() {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
