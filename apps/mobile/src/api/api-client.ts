import { API } from "./generated-api";

export const ApiClient = new API({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  secure: true,
  withCredentials: true
});
