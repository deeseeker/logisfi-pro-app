"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createShipper,
  createShipperPrices,
  createShippersBulk,
  deleteShipper,
  deleteShipperPrice,
  getShipperPriceList,
  getShippers,
  updateShipper,
  updateShipperPrice,
} from "../services/shippers.service";
import {
  shipperKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  CreateShipperCommand,
  CreateShipperPricesCommand,
  CreateShippersCommand,
  DeleteShipperPriceCommand,
  ShipperMiniModelBaseResponse,
  ShipperMiniModelPagedListBaseResponse,
  ShipperPriceModelBaseResponse,
  ShipperPriceModelPagedListBaseResponse,
  StringBaseResponse,
  UpdateShipperCommand,
  UpdateShipperPriceCommand,
} from "../types/models";
import type {
  ShipperPriceListParams,
  ShippersParams,
} from "../types/params";

/**
 * Gets all shippers paginated by given parameters
 */
export function useShippers(params?: ShippersParams, queryOptions?: Omit<UseQueryOptions<ShipperMiniModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: shipperKeys.shippers(params),
    queryFn: () => getShippers(params),
    ...queryOptions,
  });
}

/**
 * Gets a shiper's price list
 */
export function useShipperPriceList(params?: ShipperPriceListParams, queryOptions?: Omit<UseQueryOptions<ShipperPriceModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: shipperKeys.shipperPriceList(params),
    queryFn: () => getShipperPriceList(params),
    ...queryOptions,
  });
}

export interface CreateShipperVariables {
  body: CreateShipperCommand;
}

/**
 * Create a shipper
 */
export function useCreateShipper(mutationOptions?: UseMutationOptions<ShipperMiniModelBaseResponse, ApiError, CreateShipperVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateShipperVariables) => createShipper(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipperKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateShipperVariables {
  body: UpdateShipperCommand;
}

/**
 * Update a shipper
 */
export function useUpdateShipper(mutationOptions?: UseMutationOptions<ShipperMiniModelBaseResponse, ApiError, UpdateShipperVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateShipperVariables) => updateShipper(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipperKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CreateShippersBulkVariables {
  body: CreateShippersCommand;
}

/**
 * Create shippers in bulk
 */
export function useCreateShippersBulk(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateShippersBulkVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateShippersBulkVariables) => createShippersBulk(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipperKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DeleteShipperVariables {
  shipperId: string;
}

/**
 * Delete a shipper
 */
export function useDeleteShipper(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, DeleteShipperVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: DeleteShipperVariables) => deleteShipper(variables.shipperId),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipperKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CreateShipperPricesVariables {
  body: CreateShipperPricesCommand;
}

/**
 * Create shipper prices
 */
export function useCreateShipperPrices(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateShipperPricesVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateShipperPricesVariables) => createShipperPrices(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipperKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateShipperPriceVariables {
  body: UpdateShipperPriceCommand;
}

/**
 * Update a shipper's price
 */
export function useUpdateShipperPrice(mutationOptions?: UseMutationOptions<ShipperPriceModelBaseResponse, ApiError, UpdateShipperPriceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateShipperPriceVariables) => updateShipperPrice(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipperKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DeleteShipperPriceVariables {
  body: DeleteShipperPriceCommand;
}

/**
 * Delete a shipper's price
 */
export function useDeleteShipperPrice(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, DeleteShipperPriceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: DeleteShipperPriceVariables) => deleteShipperPrice(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipperKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
