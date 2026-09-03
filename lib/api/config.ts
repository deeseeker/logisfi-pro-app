const PRODUCTION_API_HOST = "https://logisfi-pro-api-production.somee.com";

/**
 * Public API host. Override with `NEXT_PUBLIC_API_BASE_URL` (no trailing slash).
 * API docs: https://logisfi-pro-api-production.somee.com/swagger
 *
 * In the browser we default to same-origin (`""`) so requests hit the Next.js
 * rewrite proxy and avoid CORS. Server-side calls use the real API host.
 */
function resolveApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  if (typeof window !== "undefined") {
    return "";
  }
  return (
    process.env.API_BASE_URL?.replace(/\/+$/, "") ?? PRODUCTION_API_HOST
  );
}

export const API_BASE_URL = resolveApiBaseUrl().replace(/\/+$/, "");

/** OpenAPI version prefix used by LogisfiPro.API v1. */
export const API_PREFIX = "/api/v1";

/** Default request timeout in milliseconds. */
export const DEFAULT_TIMEOUT_MS = 30_000;

/**
 * Absolute origin + version prefix, e.g. `https://host/api/v1`.
 */
export function getApiRoot(): string {
  return `${API_BASE_URL}${API_PREFIX}`;
}
