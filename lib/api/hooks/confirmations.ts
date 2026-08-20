"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  confirmWaybill,
  getConfirmation,
} from "../services/confirmations.service";
import {
  confirmationKeys,
  waybillKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  StringBaseResponse,
  WaybillConfirmationSummaryModelBaseResponse,
} from "../types/models";

/**
 * Get Waybill Confirmation Summary
 */
export function useConfirmation(token: string, queryOptions?: Omit<UseQueryOptions<WaybillConfirmationSummaryModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: confirmationKeys.confirmation(token),
    queryFn: () => getConfirmation(token),
    enabled: Boolean(token) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

export interface ConfirmWaybillVariables {
  token: string;
}

/**
 * Confirm Waybill
 */
export function useConfirmWaybill(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, ConfirmWaybillVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ConfirmWaybillVariables) => confirmWaybill(variables.token),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: confirmationKeys.all });
      await queryClient.invalidateQueries({ queryKey: waybillKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
