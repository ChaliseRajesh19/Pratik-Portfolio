const rawApiBaseUrl = import.meta.env.VITE_API_URL?.trim();

function trimTrailingSlash(value) {
  return value ? value.replace(/\/+$/, "") : "";
}

function resolveApiBaseUrl() {
  if (rawApiBaseUrl) return trimTrailingSlash(rawApiBaseUrl);

  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000";
    }

    return trimTrailingSlash(origin);
  }

  return "";
}

export const API_BASE_URL = resolveApiBaseUrl();

export function apiUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export function assetUrl(path = "") {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const cleanPath = path.replace(/\\/g, "/");
  return `${API_BASE_URL}${cleanPath.startsWith("/") ? "" : "/"}${cleanPath}`;
}
