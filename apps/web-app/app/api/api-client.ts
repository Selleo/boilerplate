import { API } from "./generated-api";

const API_VERSION = "v1";

export const ApiClient = new API({
  baseURL: import.meta.env.VITE_API_URL,
  secure: true,
  withCredentials: true
});
