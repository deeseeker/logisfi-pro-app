import { getAccessToken } from "./auth";
import { DEFAULT_TIMEOUT_MS, getApiRoot } from "./config";
import {
  createApiError,
  envelopeError,
  NetworkError,
  TimeoutError,
} from "./errors";

export type QueryParamPrimitive = string | number | boolean;
export type QueryParamValue =
  | QueryParamPrimitive
  | null
  | undefined
  | ReadonlyArray<QueryParamPrimitive | null | undefined>;

/** OpenAPI query objects (PascalCase keys, string unions) are passed through as-is. */
export type QueryParams = object;

export type ResponseParseAs = "json" | "blob" | "text";

export interface RequestOptions {
  query?: QueryParams;
  headers?: HeadersInit;
  body?: unknown;
  timeoutMs?: number;
  signal?: AbortSignal;
  /**
   * When false, the Authorization header is omitted.
   * Defaults to true (global Bearer security in the OpenAPI spec).
   */
  auth?: boolean;
  /** Per-request token; takes precedence over {@link getAccessToken}. */
  token?: string | null;
  parseAs?: ResponseParseAs;
}

export interface ApiClientConfig {
  getAccessToken?: () => string | null | Promise<string | null>;
  timeoutMs?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Serializes a query object into a `?foo=bar` string. `null` / `undefined`
 * values are omitted; arrays become repeated keys.
 */
export function buildQueryString(query?: QueryParams): string {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined || item === null) {
          continue;
        }
        params.append(key, String(item));
      }
      continue;
    }
    params.set(key, String(value));
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

function joinUrl(path: string): string {
  const root = getApiRoot();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${root}${normalized}`;
}

function mergeHeaders(
  init: HeadersInit | undefined,
  extras: Record<string, string>
): Headers {
  const headers = new Headers(init);
  for (const [key, value] of Object.entries(extras)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }
  return headers;
}

function isEnvelope(value: unknown): value is {
  isSuccess?: boolean;
  responseMessage?: string | null;
} {
  return isRecord(value) && "isSuccess" in value;
}

async function parseJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function abortWithTimeout(
  timeoutMs: number,
  external?: AbortSignal
): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort("timeout");
  }, timeoutMs);

  const onExternalAbort = () => {
    controller.abort(external?.reason);
  };

  if (external) {
    if (external.aborted) {
      controller.abort(external.reason);
    } else {
      external.addEventListener("abort", onExternalAbort);
    }
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeoutId);
      external?.removeEventListener("abort", onExternalAbort);
    },
  };
}

function toBodyInit(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }
  if (body instanceof FormData || body instanceof Blob || body instanceof URLSearchParams) {
    return body;
  }
  if (typeof body === "string" || body instanceof ArrayBuffer) {
    return body;
  }
  return JSON.stringify(body);
}

async function readResponse(
  response: Response,
  parseAs: ResponseParseAs
): Promise<unknown> {
  switch (parseAs) {
    case "blob":
      return response.blob();
    case "text":
      return response.text();
    case "json":
      return parseJsonBody(response);
    default: {
      const _exhaustive: never = parseAs;
      return _exhaustive;
    }
  }
}

/**
 * Native-fetch HTTP client with JSON encoding, Bearer injection, timeouts,
 * and typed errors.
 */
export class ApiClient {
  private readonly tokenGetter: ApiClientConfig["getAccessToken"];
  private readonly defaultTimeoutMs: number;

  constructor(config: ApiClientConfig = {}) {
    this.tokenGetter = config.getAccessToken;
    this.defaultTimeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  /** GET JSON (or blob/text when `parseAs` is set). */
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, options);
  }

  /** POST with an optional JSON / FormData / Blob body. */
  async post<T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("POST", path, { ...options, body });
  }

  /** PUT with an optional JSON body. */
  async put<T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PUT", path, { ...options, body });
  }

  /** PATCH with an optional JSON body. */
  async patch<T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PATCH", path, { ...options, body });
  }

  /** DELETE. Pass a body via `options.body` when the spec requires one. */
  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, options);
  }

  private async request<T>(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      query,
      headers: headerInit,
      body,
      timeoutMs = this.defaultTimeoutMs,
      signal,
      auth = true,
      token,
      parseAs = "json",
    } = options;

    const url = `${joinUrl(path)}${buildQueryString(query)}`;
    const extras: Record<string, string> = {};

    const isFormData = body instanceof FormData;
    if (!isFormData && body !== undefined && body !== null && !(body instanceof Blob)) {
      extras["Content-Type"] = "application/json";
    }

    if (auth) {
      const accessToken =
        token !== undefined ? token : await (this.tokenGetter ?? getAccessToken)();
      if (accessToken) {
        extras.Authorization = `Bearer ${accessToken}`;
      }
    }

    const headers = mergeHeaders(headerInit, extras);
    const { signal: abortSignal, cleanup } = abortWithTimeout(timeoutMs, signal);

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers,
        body: toBodyInit(body),
        signal: abortSignal,
      });
    } catch (error) {
      if (abortSignal.aborted && abortSignal.reason === "timeout") {
        throw new TimeoutError();
      }
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new TimeoutError();
      }
      const message =
        error instanceof Error ? error.message : "Network request failed";
      throw new NetworkError(message);
    } finally {
      cleanup();
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const parsed = await readResponse(response, parseAs);

    if (!response.ok) {
      throw createApiError(response.status, parsed);
    }

    if (parseAs === "json" && isEnvelope(parsed) && parsed.isSuccess === false) {
      throw envelopeError(parsed, response.status);
    }

    return parsed as T;
  }
}

export const apiClient = new ApiClient();

/** Creates a client with a custom token getter (useful in Server Components). */
export function createApiClient(config?: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
