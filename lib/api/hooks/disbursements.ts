"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  getDisbursement,
  getDisbursements,
  reconcileDisbursement,
  reverseDisbursement,
} from "../services/disbursements.service";
import {
  disbursementsKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  DisbursementModelBaseResponse,
  DisbursementModelPagedListBaseResponse,
  ReverseDisbursementCommand,
} from "../types/models";
import type {
  DisbursementsParams,
} from "../types/params";

/**
 * Retrieve paginated disbursements (filter by status/type)
 */
export function useDisbursements(params?: DisbursementsParams, queryOptions?: Omit<UseQueryOptions<DisbursementModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: disbursementsKeys.disbursements(params),
    queryFn: () => getDisbursements(params),
    ...queryOptions,
  });
}

/**
 * Retrieve a single disbursement by id
 */
export function useDisbursement(id: string, queryOptions?: Omit<UseQueryOptions<DisbursementModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: disbursementsKeys.disbursement(id),
    queryFn: () => getDisbursement(id),
    enabled: Boolean(id) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

export interface ReverseDisbursementVariables {
  id: string;
  body: ReverseDisbursementCommand;
}

/**
 * Reverse a succeeded disbursement (posts a compensating credit to the source wallet)
 */
export function useReverseDisbursement(mutationOptions?: UseMutationOptions<DisbursementModelBaseResponse, ApiError, ReverseDisbursementVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ReverseDisbursementVariables) => reverseDisbursement(variables.id, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: disbursementsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ReconcileDisbursementVariables {
  id: string;
}

/**
 * Manually trigger a bank status inquiry for an Unknown/Submitted disbursement
 */
export function useReconcileDisbursement(mutationOptions?: UseMutationOptions<DisbursementModelBaseResponse, ApiError, ReconcileDisbursementVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ReconcileDisbursementVariables) => reconcileDisbursement(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: disbursementsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
