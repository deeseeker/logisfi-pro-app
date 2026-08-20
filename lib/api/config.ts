/**
 * Public API host. Override with `NEXT_PUBLIC_API_BASE_URL` (no trailing slash).
 * Paths passed to the client are relative to {@link API_PREFIX}.
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://logisfi-pro-api-production.somee.com"
).replace(/\/+$/, "");

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
