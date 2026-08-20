/**
 * Access / refresh token helpers.
 * Services must not read storage directly — the fetch client calls these.
 */

export const ACCESS_TOKEN_STORAGE_KEY = "token";
export const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
export const ACCESS_TOKEN_COOKIE = "logisfi_access_token";
export const REFRESH_TOKEN_COOKIE = "logisfi_refresh_token";

export type TokenGetter = () => string | null | Promise<string | null>;

let accessTokenOverride: TokenGetter | null = null;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }
  const prefix = `${encodeURIComponent(name)}=`;
  const match = document.cookie.split("; ").find((row) => row.startsWith(prefix));
  if (!match) {
    return null;
  }
  return decodeURIComponent(match.slice(prefix.length));
}

function writeCookie(name: string, value: string | null): void {
  if (typeof document === "undefined") {
    return;
  }
  if (value === null) {
    document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax`;
    return;
  }
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`;
}

/**
 * Optional override for Server Components / tests. Prefer passing `token`
 * on {@link import("./client").RequestOptions} for per-request SSR auth.
 */
export function setAccessTokenGetter(getter: TokenGetter | null): void {
  accessTokenOverride = getter;
}

/** Reads the access token from the override, localStorage, then a cookie. */
export async function getAccessToken(): Promise<string | null> {
  if (accessTokenOverride) {
    return accessTokenOverride();
  }
  if (typeof window === "undefined") {
    return null;
  }
  return (
    window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ??
    readCookie(ACCESS_TOKEN_COOKIE)
  );
}

/** Reads the refresh token from localStorage, then a cookie. */
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    window.localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) ??
    readCookie(REFRESH_TOKEN_COOKIE)
  );
}

export function setAccessToken(token: string | null): void {
  if (typeof window === "undefined") {
    return;
  }
  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
  writeCookie(ACCESS_TOKEN_COOKIE, token);
}

export function setRefreshToken(token: string | null): void {
  if (typeof window === "undefined") {
    return;
  }
  if (token) {
    window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }
  writeCookie(REFRESH_TOKEN_COOKIE, token);
}

export function persistSession(tokens: {
  accessToken?: string | null;
  refreshToken?: string | null;
}): void {
  if (tokens.accessToken !== undefined) {
    setAccessToken(tokens.accessToken);
  }
  if (tokens.refreshToken !== undefined) {
    setRefreshToken(tokens.refreshToken);
  }
}

export function clearSession(): void {
  setAccessToken(null);
  setRefreshToken(null);
}
