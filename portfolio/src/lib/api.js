import axios from "axios";

export const API_BASE_URL = "https://portfolio-backend-r2k1.vercel.app";

function trimTrailingSlash(value) {
  return value ? value.replace(/\/+$/, "") : "";
}
export const RESOLVED_API_BASE_URL = trimTrailingSlash(API_BASE_URL);

export const api = axios.create({
  baseURL: RESOLVED_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("adminToken");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export function apiUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${RESOLVED_API_BASE_URL}${cleanPath}`;
}

export function assetUrl(path = "") {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const cleanPath = path.replace(/\\/g, "/");
  return `${RESOLVED_API_BASE_URL}${cleanPath.startsWith("/") ? "" : "/"}${cleanPath}`;
}

export function getErrorMessage(error, fallback = "Something went wrong") {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

export function isRequestCanceled(error) {
  return axios.isCancel(error) || error?.code === "ERR_CANCELED";
}

export default api;
