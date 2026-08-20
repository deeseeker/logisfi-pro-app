"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  approveFinancingRequest,
  getFinancingConfiguration,
  getFinancingRequests,
  getInvestorSummary,
  rejectFinancingRequest,
  submitFinancingRequest,
  upsertFinancingConfiguration,
} from "../services/financing.service";
import {
  disbursementsKeys,
  financingKeys,
  shipmentKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  FinancingConfigurationModelBaseResponse,
  FinancingRequestModelBaseResponse,
  FinancingRequestModelPagedListBaseResponse,
  InvestorCardSummaryModelBaseResponse,
  RejectFinancingRequestCommand,
  SubmitFinancingRequestCommand,
  UpsertFinancingConfigurationCommand,
} from "../types/models";
import type {
  FinancingRequestsParams,
} from "../types/params";

/**
 * Retrieve paginated financing requests (investors see their own organization only)
 */
export function useFinancingRequests(params?: FinancingRequestsParams, queryOptions?: Omit<UseQueryOptions<FinancingRequestModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financingKeys.financingRequests(params),
    queryFn: () => getFinancingRequests(params),
    ...queryOptions,
  });
}

/**
 * Retrieve the effective financing configuration for an organization
 */
export function useFinancingConfiguration(orgId: string, queryOptions?: Omit<UseQueryOptions<FinancingConfigurationModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financingKeys.financingConfiguration(orgId),
    queryFn: () => getFinancingConfiguration(orgId),
    enabled: Boolean(orgId) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

/**
 * Retrieve investor card summary (wallet, exposure, utilization, active shipments)
 */
export function useInvestorSummary(orgId: string, queryOptions?: Omit<UseQueryOptions<InvestorCardSummaryModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financingKeys.investorSummary(orgId),
    queryFn: () => getInvestorSummary(orgId),
    enabled: Boolean(orgId) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

export interface SubmitFinancingRequestVariables {
  body: SubmitFinancingRequestCommand;
}

/**
 * Submit a financing request for a confirmed waybill
 */
export function useSubmitFinancingRequest(mutationOptions?: UseMutationOptions<FinancingRequestModelBaseResponse, ApiError, SubmitFinancingRequestVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: SubmitFinancingRequestVariables) => submitFinancingRequest(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financingKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ApproveFinancingRequestVariables {
  id: string;
}

/**
 * Approve a pending financing request and trigger disbursement
 */
export function useApproveFinancingRequest(mutationOptions?: UseMutationOptions<FinancingRequestModelBaseResponse, ApiError, ApproveFinancingRequestVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ApproveFinancingRequestVariables) => approveFinancingRequest(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financingKeys.all });
      await queryClient.invalidateQueries({ queryKey: disbursementsKeys.all });
      await queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface RejectFinancingRequestVariables {
  id: string;
  body: RejectFinancingRequestCommand;
}

/**
 * Reject a pending financing request
 */
export function useRejectFinancingRequest(mutationOptions?: UseMutationOptions<FinancingRequestModelBaseResponse, ApiError, RejectFinancingRequestVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: RejectFinancingRequestVariables) => rejectFinancingRequest(variables.id, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financingKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpsertFinancingConfigurationVariables {
  orgId: string;
  body: UpsertFinancingConfigurationCommand;
}

/**
 * Upsert an effective-dated financing configuration (SuperAdmin/StaffAdmin only)
 */
export function useUpsertFinancingConfiguration(mutationOptions?: UseMutationOptions<FinancingConfigurationModelBaseResponse, ApiError, UpsertFinancingConfigurationVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpsertFinancingConfigurationVariables) => upsertFinancingConfiguration(variables.orgId, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financingKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
