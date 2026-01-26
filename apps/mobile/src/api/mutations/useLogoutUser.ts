import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/modules/auth/auth-mobile.client";

export function useLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await authClient.signOut();

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
