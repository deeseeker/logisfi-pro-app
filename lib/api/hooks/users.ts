"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  addUserToOrganization,
  getProfile,
  updateProfile,
} from "../services/users.service";
import {
  organizationKeys,
  userKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  AddUserToOrganizationCommand,
  StringBaseResponse,
  UpdateProfileCommand,
  UserModelBaseResponse,
} from "../types/models";

/**
 * Gets a user's profile
 */
export function useUser(queryOptions?: Omit<UseQueryOptions<UserModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => getProfile(),
    ...queryOptions,
  });
}

export interface UpdateProfileVariables {
  body: UpdateProfileCommand;
}

/**
 * Update's a user profile
 */
export function useUpdateProfile(mutationOptions?: UseMutationOptions<UserModelBaseResponse, ApiError, UpdateProfileVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateProfileVariables) => updateProfile(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface AddUserToOrganizationVariables {
  body: AddUserToOrganizationCommand;
}

/**
 * Add a user to existing organization
 */
export function useAddUserToOrganization(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, AddUserToOrganizationVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: AddUserToOrganizationVariables) => addUserToOrganization(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
