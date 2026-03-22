export const API_BASE_URL = "https://portfolio-backend-r2k1.vercel.app";

function trimTrailingSlash(value) {
  return value ? value.replace(/\/+$/, "") : "";
}
export const RESOLVED_API_BASE_URL = trimTrailingSlash(API_BASE_URL);

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
