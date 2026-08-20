"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createOrganization,
  deleteOrganization,
  getInvestments,
  getMobilizations,
  getOrganization,
  getOrganizationWallet,
  getOrganizations,
  getTransactions,
  updateOrganization,
} from "../services/organizations.service";
import {
  organizationKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  AddOrganizationCommand,
  InvestmentModelPagedListBaseResponse,
  MobilizationModelPagedListBaseResponse,
  OrganizationModelBaseResponse,
  OrganizationModelPagedListBaseResponse,
  StringBaseResponse,
  TransactionModelPagedListBaseResponse,
  UpdateOrganizationCommand,
  WalletModelBaseResponse,
} from "../types/models";
import type {
  InvestmentsParams,
  MobilizationsParams,
  OrganizationsParams,
  TransactionsParams,
} from "../types/params";

/**
 * Get organizations
 */
export function useOrganizations(params?: OrganizationsParams, queryOptions?: Omit<UseQueryOptions<OrganizationModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: organizationKeys.organizations(params),
    queryFn: () => getOrganizations(params),
    ...queryOptions,
  });
}

/**
 * Get organization
 */
export function useOrganization(id: string, queryOptions?: Omit<UseQueryOptions<OrganizationModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: organizationKeys.organization(id),
    queryFn: () => getOrganization(id),
    enabled: Boolean(id) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

/**
 * Get investments
 */
export function useInvestments(params?: InvestmentsParams, queryOptions?: Omit<UseQueryOptions<InvestmentModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: organizationKeys.investments(params),
    queryFn: () => getInvestments(params),
    ...queryOptions,
  });
}

/**
 * Get mobilizations
 */
export function useMobilizations(params?: MobilizationsParams, queryOptions?: Omit<UseQueryOptions<MobilizationModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: organizationKeys.mobilizations(params),
    queryFn: () => getMobilizations(params),
    ...queryOptions,
  });
}

/**
 * Get transactions
 */
export function useTransactions(params?: TransactionsParams, queryOptions?: Omit<UseQueryOptions<TransactionModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: organizationKeys.transactions(params),
    queryFn: () => getTransactions(params),
    ...queryOptions,
  });
}

/**
 * Get wallet
 */
export function useOrganizationWallet(organizationId: string, queryOptions?: Omit<UseQueryOptions<WalletModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: organizationKeys.organizationWallet(organizationId),
    queryFn: () => getOrganizationWallet(organizationId),
    enabled: Boolean(organizationId) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

export interface CreateOrganizationVariables {
  body: AddOrganizationCommand;
}

/**
 * Create organization
 */
export function useCreateOrganization(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateOrganizationVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateOrganizationVariables) => createOrganization(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateOrganizationVariables {
  id: string;
  body: UpdateOrganizationCommand;
}

/**
 * Update organization
 */
export function useUpdateOrganization(mutationOptions?: UseMutationOptions<OrganizationModelBaseResponse, ApiError, UpdateOrganizationVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateOrganizationVariables) => updateOrganization(variables.id, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DeleteOrganizationVariables {
  id: string;
}

/**
 * Delete organization
 */
export function useDeleteOrganization(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, DeleteOrganizationVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: DeleteOrganizationVariables) => deleteOrganization(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
