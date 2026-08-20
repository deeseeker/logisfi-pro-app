"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createVendor,
  createVendorPrices,
  createVendorsBulk,
  deleteVendor,
  deleteVendorPrice,
  getVendorPriceList,
  getVendors,
  updateVendor,
  updateVendorPrice,
} from "../services/vendors.service";
import {
  vendorKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  CreateVendorCommand,
  CreateVendorPricesCommand,
  CreateVendorsCommand,
  DeleteVendorPriceCommand,
  StringBaseResponse,
  UpdateVendorCommand,
  UpdateVendorPriceCommand,
  VendorMiniModelBaseResponse,
  VendorMiniModelPagedListBaseResponse,
  VendorPriceModelBaseResponse,
  VendorPriceModelPagedListBaseResponse,
} from "../types/models";
import type {
  VendorPriceListParams,
  VendorsParams,
} from "../types/params";

/**
 * Gets all vendors paginated by given parameters
 */
export function useVendors(params?: VendorsParams, queryOptions?: Omit<UseQueryOptions<VendorMiniModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: vendorKeys.vendors(params),
    queryFn: () => getVendors(params),
    ...queryOptions,
  });
}

/**
 * Gets a vendor's price list
 */
export function useVendorPriceList(params?: VendorPriceListParams, queryOptions?: Omit<UseQueryOptions<VendorPriceModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: vendorKeys.vendorPriceList(params),
    queryFn: () => getVendorPriceList(params),
    ...queryOptions,
  });
}

export interface CreateVendorVariables {
  body: CreateVendorCommand;
}

/**
 * Create a vendor
 */
export function useCreateVendor(mutationOptions?: UseMutationOptions<VendorMiniModelBaseResponse, ApiError, CreateVendorVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateVendorVariables) => createVendor(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateVendorVariables {
  body: UpdateVendorCommand;
}

/**
 * Update a vendor
 */
export function useUpdateVendor(mutationOptions?: UseMutationOptions<VendorMiniModelBaseResponse, ApiError, UpdateVendorVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateVendorVariables) => updateVendor(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CreateVendorsBulkVariables {
  body: CreateVendorsCommand;
}

/**
 * Create vendors in bulk
 */
export function useCreateVendorsBulk(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateVendorsBulkVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateVendorsBulkVariables) => createVendorsBulk(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DeleteVendorVariables {
  vendorId: string;
}

/**
 * Delete a vendor
 */
export function useDeleteVendor(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, DeleteVendorVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: DeleteVendorVariables) => deleteVendor(variables.vendorId),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CreateVendorPricesVariables {
  body: CreateVendorPricesCommand;
}

/**
 * Create vendor prices
 */
export function useCreateVendorPrices(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateVendorPricesVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateVendorPricesVariables) => createVendorPrices(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateVendorPriceVariables {
  body: UpdateVendorPriceCommand;
}

/**
 * Update a vendor's price
 */
export function useUpdateVendorPrice(mutationOptions?: UseMutationOptions<VendorPriceModelBaseResponse, ApiError, UpdateVendorPriceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateVendorPriceVariables) => updateVendorPrice(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DeleteVendorPriceVariables {
  body: DeleteVendorPriceCommand;
}

/**
 * Delete a vendor's price
 */
export function useDeleteVendorPrice(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, DeleteVendorPriceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: DeleteVendorPriceVariables) => deleteVendorPrice(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
