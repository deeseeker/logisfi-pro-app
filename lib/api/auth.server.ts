import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_STORAGE_KEY } from "./auth";
import { createApiClient } from "./client";

/**
 * Reads the access token from request cookies (Server Components / Route Handlers).
 */
export async function getServerAccessToken(): Promise<string | null> {
  const store = await cookies();
  return (
    store.get(ACCESS_TOKEN_COOKIE)?.value ??
    store.get(ACCESS_TOKEN_STORAGE_KEY)?.value ??
    null
  );
}

/**
 * Fetch client bound to the current request cookie jar.
 */
export async function createServerApiClient() {
  const token = await getServerAccessToken();
  return createApiClient({
    getAccessToken: () => token,
  });
}
