import axios from "axios";
import { toast } from "sonner";

const apiClient = axios.create({

  baseURL: "https://mozno-server.vercel.app/api",

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    toast.error("Server error")
    return Promise.reject(error);
  },
);

export default apiClient;
