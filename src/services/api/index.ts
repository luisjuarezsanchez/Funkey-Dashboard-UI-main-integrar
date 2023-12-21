import ApiClient from "./ApiClient";

const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_BFF_URL || "",
  accessToken: "",
});

export default apiClient;
