"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  acceptInvite,
  changePassword,
  forgotPassword,
  login,
  refreshToken,
  resetPassword,
} from "../services/auth.service";
import {
  userKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
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

export interface LoginVariables {
  body: LoginCommand;
}

/**
 * Signs in a user
 */
export function useLogin(mutationOptions?: UseMutationOptions<LoginModelBaseResponse, ApiError, LoginVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: LoginVariables) => login(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface RefreshTokenVariables {
  body: RefreshTokenCommand;
}

/**
 * Refresh user's token
 */
export function useRefreshToken(mutationOptions?: UseMutationOptions<LoginModelBaseResponse, ApiError, RefreshTokenVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: RefreshTokenVariables) => refreshToken(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ForgotPasswordVariables {
  body: ForgotPasswordCommand;
}

/**
 * Initiate's password reset process
 */
export function useForgotPassword(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, ForgotPasswordVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ForgotPasswordVariables) => forgotPassword(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ResetPasswordVariables {
  body: ResetPasswordCommand;
}

/**
 * Reset's user password
 */
export function useResetPassword(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, ResetPasswordVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ResetPasswordVariables) => resetPassword(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ChangePasswordVariables {
  body: ChangePasswordCommand;
}

/**
 * Changes user password
 */
export function useChangePassword(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, ChangePasswordVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ChangePasswordVariables) => changePassword(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface AcceptInviteVariables {
  body: AcceptInviteCommand;
}

/**
 * Accepts an organization invitation
 */
export function useAcceptInvite(mutationOptions?: UseMutationOptions<UserModelBaseResponse, ApiError, AcceptInviteVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: AcceptInviteVariables) => acceptInvite(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
