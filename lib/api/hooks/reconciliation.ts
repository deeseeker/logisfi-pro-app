"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  confirmSettlement,
  disputeSettlement,
  downloadReconciliationStatement,
  generateSettlement,
  getReconciliationDashboard,
  getReconciliations,
  getSettlements,
  recomputeReconciliation,
} from "../services/reconciliation.service";
import {
  disbursementsKeys,
  reconciliationKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  DisputeSettlementCommand,
  GenerateSettlementCommand,
  ReconciliationDashboardModelBaseResponse,
  ReconciliationModelBaseResponse,
  ReconciliationModelPagedListBaseResponse,
  SettlementModelBaseResponse,
  SettlementModelPagedListBaseResponse,
} from "../types/models";
import type {
  DownloadReconciliationStatementParams,
  ReconciliationsParams,
  SettlementsParams,
} from "../types/params";

/**
 * Retrieve the reconciliation dashboard summary
 */
export function useReconciliationDashboard(queryOptions?: Omit<UseQueryOptions<ReconciliationDashboardModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: reconciliationKeys.reconciliationDashboard(),
    queryFn: () => getReconciliationDashboard(),
    ...queryOptions,
  });
}

/**
 * Retrieve paginated reconciliations (filterable by status and financing model; investors see their own organization only)
 */
export function useReconciliations(params?: ReconciliationsParams, queryOptions?: Omit<UseQueryOptions<ReconciliationModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: reconciliationKeys.reconciliations(params),
    queryFn: () => getReconciliations(params),
    ...queryOptions,
  });
}

/**
 * Retrieve paginated settlements (investors see their own organization only)
 */
export function useSettlements(params?: SettlementsParams, queryOptions?: Omit<UseQueryOptions<SettlementModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: reconciliationKeys.settlements(params),
    queryFn: () => getSettlements(params),
    ...queryOptions,
  });
}

export interface RecomputeReconciliationVariables {
  shipmentId: string;
}

/**
 * Recompute the reconciliation row for a financed shipment (StaffAdmin/SuperAdmin only)
 */
export function useRecomputeReconciliation(mutationOptions?: UseMutationOptions<ReconciliationModelBaseResponse, ApiError, RecomputeReconciliationVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: RecomputeReconciliationVariables) => recomputeReconciliation(variables.shipmentId),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: reconciliationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface GenerateSettlementVariables {
  body: GenerateSettlementCommand;
}

/**
 * Generate a settlement for an investor over a period (StaffAdmin/SuperAdmin only)
 */
export function useGenerateSettlement(mutationOptions?: UseMutationOptions<SettlementModelBaseResponse, ApiError, GenerateSettlementVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: GenerateSettlementVariables) => generateSettlement(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: reconciliationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ConfirmSettlementVariables {
  settlementId: string;
}

/**
 * Confirm a pending settlement and post the payout ledger entries (Finance/SuperAdmin only)
 */
export function useConfirmSettlement(mutationOptions?: UseMutationOptions<SettlementModelBaseResponse, ApiError, ConfirmSettlementVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ConfirmSettlementVariables) => confirmSettlement(variables.settlementId),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: reconciliationKeys.all });
      await queryClient.invalidateQueries({ queryKey: disbursementsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DisputeSettlementVariables {
  settlementId: string;
  body: DisputeSettlementCommand;
}

/**
 * Dispute a pending settlement (investors may dispute their own; finance/admin may dispute any)
 */
export function useDisputeSettlement(mutationOptions?: UseMutationOptions<SettlementModelBaseResponse, ApiError, DisputeSettlementVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: DisputeSettlementVariables) => disputeSettlement(variables.settlementId, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: reconciliationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DownloadReconciliationStatementVariables {
  params?: DownloadReconciliationStatementParams;
}

/**
 * Export a reconciliation statement for an investor + period (csv/pdf/excel)
 */
export function useDownloadReconciliationStatement(mutationOptions?: UseMutationOptions<Blob, ApiError, DownloadReconciliationStatementVariables>) {
  return useMutation({
    mutationFn: (variables: DownloadReconciliationStatementVariables) => downloadReconciliationStatement(variables.params),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
