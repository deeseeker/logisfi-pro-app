"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  createWaybillConfirmation,
} from "../services/waybills.service";
import {
  shipmentKeys,
  waybillKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  CreateWaybillConfirmationCommand,
  WaybillModelBaseResponse,
} from "../types/models";

export interface CreateWaybillConfirmationVariables {
  body: CreateWaybillConfirmationCommand;
}

/**
 * Create Waybill & Send Confirmation Request
 */
export function useCreateWaybillConfirmation(mutationOptions?: UseMutationOptions<WaybillModelBaseResponse, ApiError, CreateWaybillConfirmationVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateWaybillConfirmationVariables) => createWaybillConfirmation(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: waybillKeys.all });
      await queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
