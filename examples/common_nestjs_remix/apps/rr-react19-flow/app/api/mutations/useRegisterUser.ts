import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { authClient } from "~/modules/Auth/auth.client";

type RegisterUserOptions = {
  data: {
    email: string;
    password: string;
    name: string;
  };
};

export function useRegisterUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (options: RegisterUserOptions) => {
      const response = await authClient.signUp.email({
        email: options.data.email,
        password: options.data.password,
        name: options.data.name,
      });

      if (response.error) {
        throw new Error(response.error.message, {
          cause: response.error,
        });
      }

      return response.data;
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
