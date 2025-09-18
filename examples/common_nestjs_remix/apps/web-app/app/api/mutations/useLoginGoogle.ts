import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "~/modules/Auth/authStore";
import { authClient } from "~/modules/Auth/auth.client";
import { useNavigate } from "react-router";

export function useLoginGoogle() {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/dashboard`,
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
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
