"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createOrder,
  fulfillOrder,
  getOrders,
  updateOrder,
} from "../services/orders.service";
import {
  orderKeys,
  shipmentKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  CreateOrderCommand,
  FulfillOrderCommand,
  OrderModelPagedListBaseResponse,
  StringBaseResponse,
  UpdateOrderCommand,
} from "../types/models";
import type {
  OrdersParams,
} from "../types/params";

/**
 * Gets all orders paginated by given parameters
 */
export function useOrders(params?: OrdersParams, queryOptions?: Omit<UseQueryOptions<OrderModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: orderKeys.orders(params),
    queryFn: () => getOrders(params),
    ...queryOptions,
  });
}

export interface CreateOrderVariables {
  body: CreateOrderCommand;
}

/**
 * Create an order
 */
export function useCreateOrder(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateOrderVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateOrderVariables) => createOrder(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: orderKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateOrderVariables {
  body: UpdateOrderCommand;
}

/**
 * Update an order
 */
export function useUpdateOrder(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, UpdateOrderVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateOrderVariables) => updateOrder(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: orderKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface FulfillOrderVariables {
  body: FulfillOrderCommand;
}

/**
 * Fulfill an order
 */
export function useFulfillOrder(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, FulfillOrderVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: FulfillOrderVariables) => fulfillOrder(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: orderKeys.all });
      await queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
