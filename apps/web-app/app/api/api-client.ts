import { API } from "./generated-api";

const API_VERSION = "v1";

export const ApiClient = new API({
  baseURL: `${import.meta.env.VITE_API_URL}/api/${API_VERSION}` ,
  secure: true,
  withCredentials: true
});
