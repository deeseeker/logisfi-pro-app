"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  approveFinalPayment,
  confirmDelivery,
  confirmOffloading,
  getDelivery,
  getFinalPayments,
  rejectFinalPayment,
  requestFinalPayment,
} from "../services/deliveries.service";
import {
  deliveriesKeys,
  disbursementsKeys,
  shipmentKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  ConfirmDeliveryCommand,
  ConfirmOffloadingCommand,
  DeliveryConfirmationModelBaseResponse,
  FinalPaymentRequestModelBaseResponse,
  FinalPaymentRequestModelPagedListBaseResponse,
  RejectFinalPaymentCommand,
  RequestFinalPaymentCommand,
} from "../types/models";
import type {
  FinalPaymentsParams,
} from "../types/params";

/**
 * Retrieve the delivery confirmation for a shipment
 */
export function useDelivery(shipmentId: string, queryOptions?: Omit<UseQueryOptions<DeliveryConfirmationModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: deliveriesKeys.delivery(shipmentId),
    queryFn: () => getDelivery(shipmentId),
    enabled: Boolean(shipmentId) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

/**
 * Retrieve paginated final payment requests (filterable by shipment, vendor and status)
 */
export function useFinalPayments(params?: FinalPaymentsParams, queryOptions?: Omit<UseQueryOptions<FinalPaymentRequestModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: deliveriesKeys.finalPayments(params),
    queryFn: () => getFinalPayments(params),
    ...queryOptions,
  });
}

export interface ConfirmDeliveryVariables {
  body: ConfirmDeliveryCommand;
}

/**
 * Confirm physical delivery of a financed/mobilized shipment (creates/updates the DeliveryConfirmation; does not touch ShipmentStatus). Idempotent.
 */
export function useConfirmDelivery(mutationOptions?: UseMutationOptions<DeliveryConfirmationModelBaseResponse, ApiError, ConfirmDeliveryVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ConfirmDeliveryVariables) => confirmDelivery(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: deliveriesKeys.all });
      await queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ConfirmOffloadingVariables {
  body: ConfirmOffloadingCommand;
}

/**
 * Confirm offloading of a financed/mobilized shipment at destination. Idempotent.
 */
export function useConfirmOffloading(mutationOptions?: UseMutationOptions<DeliveryConfirmationModelBaseResponse, ApiError, ConfirmOffloadingVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ConfirmOffloadingVariables) => confirmOffloading(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: deliveriesKeys.all });
      await queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface RequestFinalPaymentVariables {
  body: RequestFinalPaymentCommand;
}

/**
 * Request the final (balance) vendor payment for a delivered shipment. Amount = VendorPrice − total mobilized. Idempotent per shipment.
 */
export function useRequestFinalPayment(mutationOptions?: UseMutationOptions<FinalPaymentRequestModelBaseResponse, ApiError, RequestFinalPaymentVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: RequestFinalPaymentVariables) => requestFinalPayment(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: deliveriesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface ApproveFinalPaymentVariables {
  id: string;
}

/**
 * Approve a pending final payment and disburse the balance to the vendor (Finance/SuperAdmin only)
 */
export function useApproveFinalPayment(mutationOptions?: UseMutationOptions<FinalPaymentRequestModelBaseResponse, ApiError, ApproveFinalPaymentVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ApproveFinalPaymentVariables) => approveFinalPayment(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: deliveriesKeys.all });
      await queryClient.invalidateQueries({ queryKey: disbursementsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface RejectFinalPaymentVariables {
  id: string;
  body: RejectFinalPaymentCommand;
}

/**
 * Reject a pending final payment with a reason (Finance/SuperAdmin only)
 */
export function useRejectFinalPayment(mutationOptions?: UseMutationOptions<FinalPaymentRequestModelBaseResponse, ApiError, RejectFinalPaymentVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: RejectFinalPaymentVariables) => rejectFinalPayment(variables.id, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: deliveriesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
