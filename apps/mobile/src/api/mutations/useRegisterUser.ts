import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { authClient } from "@/modules/auth/auth-mobile.client";

type RegisterUserOptions = {
  data: {
    email: string;
    password: string;
    name: string;
  };
};

export function useRegisterUser() {
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
      Alert.alert(
        "Registration successful",
        "Please check your email to verify your account."
      );
    },
  });
}
