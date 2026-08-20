import { persistSession } from "../auth";
import { apiClient, type RequestOptions } from "../client";
import type {
  AcceptInviteCommand,
  ChangePasswordCommand,
  ForgotPasswordCommand,
  LoginCommand,
  LoginModelBaseResponse,
  RefreshTokenCommand,
  ResetPasswordCommand,
  StringBaseResponse,
  UserModelBaseResponse,
} from "../types/models";

/**
 * Signs in a user
 * `POST /users/login`
 */
export async function login(body: LoginCommand, options?: RequestOptions): Promise<LoginModelBaseResponse> {
  const response = await apiClient.post<LoginModelBaseResponse>("/users/login", body, { ...options, auth: false });
  persistSession({
    accessToken: response.responseData?.accessToken ?? null,
    refreshToken: response.responseData?.refreshToken ?? null,
  });
  return response;
}

/**
 * Refresh user's token
 * `POST /users/refresh-token`
 */
export async function refreshToken(body: RefreshTokenCommand, options?: RequestOptions): Promise<LoginModelBaseResponse> {
  const response = await apiClient.post<LoginModelBaseResponse>("/users/refresh-token", body, { ...options, auth: false });
  persistSession({
    accessToken: response.responseData?.accessToken ?? null,
    refreshToken: response.responseData?.refreshToken ?? null,
  });
  return response;
}

/**
 * Initiate's password reset process
 * `POST /users/forgot-password`
 */
export async function forgotPassword(body: ForgotPasswordCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/users/forgot-password", body, { ...options, auth: false });
}

/**
 * Reset's user password
 * `POST /users/reset-password`
 */
export async function resetPassword(body: ResetPasswordCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/users/reset-password", body, { ...options, auth: false });
}

/**
 * Changes user password
 * `POST /users/change-password`
 */
export async function changePassword(body: ChangePasswordCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/users/change-password", body, options);
}

/**
 * Accepts an organization invitation
 * `POST /users/accept-invite`
 */
export async function acceptInvite(body: AcceptInviteCommand, options?: RequestOptions): Promise<UserModelBaseResponse> {
  return apiClient.post<UserModelBaseResponse>("/users/accept-invite", body, { ...options, auth: false });
}
