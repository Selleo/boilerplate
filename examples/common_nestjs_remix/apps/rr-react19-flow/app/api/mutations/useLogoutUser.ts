import { useAuthStore } from "./../../modules/Auth/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { queryClient } from "../queryClient";
import { authClient } from "~/modules/Auth/auth.client";

export function useLogoutUser() {
  const { setLoggedIn } = useAuthStore();
  const navigate = useNavigate();
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
      queryClient.clear();
      setLoggedIn(false);
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error(error.message);
    },
  });
}
