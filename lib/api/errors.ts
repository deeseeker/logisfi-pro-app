/**
 * HTTP / transport errors thrown by {@link apiClient}.
 * Prefer `instanceof` checks over inspecting `status` in UI code.
 */

export type ApiErrorBody = {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  errors?: Record<string, string[] | string> | string[] | string | null;
  title?: string;
  detail?: string;
  message?: string;
};

function firstValidationMessage(
  errors: ApiErrorBody["errors"]
): string | undefined {
  if (!errors) {
    return undefined;
  }
  if (typeof errors === "string") {
    return errors;
  }
  if (Array.isArray(errors)) {
    return errors.find((item) => item.trim().length > 0);
  }
  for (const value of Object.values(errors)) {
    if (typeof value === "string" && value.trim()) {
      return value;
    }
    if (Array.isArray(value)) {
      const nested = value.find((item) => item.trim().length > 0);
      if (nested) {
        return nested;
      }
    }
  }
  return undefined;
}

function messageFromBody(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") {
    return fallback;
  }
  const payload = body as ApiErrorBody;
  return (
    payload.responseMessage ||
    firstValidationMessage(payload.errors) ||
    payload.detail ||
    payload.title ||
    payload.message ||
    fallback
  );
}

export class ApiError extends Error {
  readonly status: number;
  readonly responseCode: string | undefined;
  readonly responseMessage: string;
  readonly isSuccess = false;
  readonly body: unknown;

  constructor(
    message: string,
    status: number,
    body?: unknown,
    responseCode?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
    this.responseCode = responseCode;
    this.responseMessage = message;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    message = "Unauthorized",
    body?: unknown,
    responseCode?: string,
    status = 401
  ) {
    super(message, status, body, responseCode);
    this.name = "UnauthorizedError";
  }
}

export class ValidationError extends ApiError {
  constructor(
    message = "Validation failed",
    status = 400,
    body?: unknown,
    responseCode?: string
  ) {
    super(message, status, body, responseCode);
    this.name = "ValidationError";
  }
}

export class NetworkError extends Error {
  readonly responseMessage: string;

  constructor(message = "Network request failed") {
    super(message);
    this.name = "NetworkError";
    this.responseMessage = message;
  }
}

export class TimeoutError extends NetworkError {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
  }
}

/**
 * Maps an HTTP status (and optional JSON body) to a typed error instance.
 */
export function createApiError(status: number, body: unknown): ApiError {
  const payload =
    body && typeof body === "object" ? (body as ApiErrorBody) : undefined;
  const responseCode = payload?.responseCode ?? undefined;
  const message = messageFromBody(body, `Request failed with status ${status}`);

  if (status === 401 || status === 403) {
    return new UnauthorizedError(
      status === 403 ? message || "Forbidden" : message,
      body,
      responseCode,
      status
    );
  }

  if (status === 400 || status === 409 || status === 422) {
    return new ValidationError(message, status, body, responseCode);
  }

  return new ApiError(message, status, body, responseCode);
}

/**
 * Converts a failed JSON envelope (`isSuccess: false`) into an error.
 */
export function envelopeError(body: unknown, status = 400): ApiError {
  return createApiError(status, body);
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** Envelope-shaped failure for callers that check `isSuccess` instead of catching. */
export function failedEnvelope(error: unknown): {
  isSuccess: false;
  responseMessage: string;
} {
  return {
    isSuccess: false,
    responseMessage: getApiErrorMessage(error),
  };
}

/** Reads a user-facing message from an API/network error. */
export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError || error instanceof NetworkError) {
    return error.responseMessage;
  }
  if (error && typeof error === "object" && "responseMessage" in error) {
    const message = (error as { responseMessage?: unknown }).responseMessage;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Request failed";
}
