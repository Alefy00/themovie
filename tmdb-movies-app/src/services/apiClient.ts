import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = import.meta.env.VITE_TMDB_API_TOKEN;
  const lang = import.meta.env.VITE_TMDB_LANG || "pt-BR";

  // Em vez de sobrescrever headers, garantimos que existe e depois setamos os campos
  config.headers = config.headers || {};
  config.headers.accept = "application/json";
  config.headers.Authorization = token;

  // Garante que `params` existe e injeta language padrão se não vier
  config.params = config.params || {};
  if (!config.params.language) {
    config.params.language = lang;
  }

  return config;
});

export default apiClient;
