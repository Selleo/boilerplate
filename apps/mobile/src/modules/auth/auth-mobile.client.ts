import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL!,
  plugins: [
    expoClient({
      scheme: "mobile",
      storagePrefix: "mobile_auth_",
      storage: SecureStore,
    }),
    adminClient(),
  ],
});
