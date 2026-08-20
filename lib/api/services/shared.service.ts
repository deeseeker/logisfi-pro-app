import { apiClient, type RequestOptions } from "../client";
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
 * `GET /shared/banks`
 */
export async function getBanks(params?: BanksParams, options?: RequestOptions): Promise<BankModelPagedListBaseResponse> {
  return apiClient.get<BankModelPagedListBaseResponse>("/shared/banks", { ...options, query: params });
}

/**
 * Gets the list of truck sizes
 * `GET /shared/truck-sizes`
 */
export async function getTruckSizes(options?: RequestOptions): Promise<TruckSizeMiniModelIEnumerableBaseResponse> {
  return apiClient.get<TruckSizeMiniModelIEnumerableBaseResponse>("/shared/truck-sizes", options);
}

/**
 * Gets the list of product types
 * `GET /shared/product-types`
 */
export async function getProductTypes(options?: RequestOptions): Promise<ProductTypeMiniModelIEnumerableBaseResponse> {
  return apiClient.get<ProductTypeMiniModelIEnumerableBaseResponse>("/shared/product-types", options);
}
