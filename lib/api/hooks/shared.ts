"use client";

import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  getBanks,
  getProductTypes,
  getTruckSizes,
} from "../services/shared.service";
import {
  sharedKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  BankModelPagedListBaseResponse,
  ProductTypeMiniModelIEnumerableBaseResponse,
  TruckSizeMiniModelIEnumerableBaseResponse,
} from "../types/models";
import type {
  BanksParams,
} from "../types/params";

/**
 * Gets the list of banks
 */
export function useBanks(params?: BanksParams, queryOptions?: Omit<UseQueryOptions<BankModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: sharedKeys.banks(params),
    queryFn: () => getBanks(params),
    ...queryOptions,
  });
}

/**
 * Gets the list of truck sizes
 */
export function useTruckSizes(queryOptions?: Omit<UseQueryOptions<TruckSizeMiniModelIEnumerableBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: sharedKeys.truckSizes(),
    queryFn: () => getTruckSizes(),
    ...queryOptions,
  });
}

/**
 * Gets the list of product types
 */
export function useProductTypes(queryOptions?: Omit<UseQueryOptions<ProductTypeMiniModelIEnumerableBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: sharedKeys.productTypes(),
    queryFn: () => getProductTypes(),
    ...queryOptions,
  });
}
