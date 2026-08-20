import { apiClient, type RequestOptions } from "../client";
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
 * `GET /shippers`
 */
export async function getShippers(params?: ShippersParams, options?: RequestOptions): Promise<ShipperMiniModelPagedListBaseResponse> {
  return apiClient.get<ShipperMiniModelPagedListBaseResponse>("/shippers", { ...options, query: params });
}

/**
 * Create a shipper
 * `POST /shippers`
 */
export async function createShipper(body: CreateShipperCommand, options?: RequestOptions): Promise<ShipperMiniModelBaseResponse> {
  return apiClient.post<ShipperMiniModelBaseResponse>("/shippers", body, options);
}

/**
 * Update a shipper
 * `PUT /shippers`
 */
export async function updateShipper(body: UpdateShipperCommand, options?: RequestOptions): Promise<ShipperMiniModelBaseResponse> {
  return apiClient.put<ShipperMiniModelBaseResponse>("/shippers", body, options);
}

/**
 * Create shippers in bulk
 * `POST /shippers/bulk`
 */
export async function createShippersBulk(body: CreateShippersCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/shippers/bulk", body, options);
}

/**
 * Delete a shipper
 * `DELETE /shippers/{shipperId}`
 */
export async function deleteShipper(shipperId: string, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.delete<StringBaseResponse>(`/shippers/${encodeURIComponent(shipperId)}`, options);
}

/**
 * Create shipper prices
 * `POST /shippers/create-prices`
 */
export async function createShipperPrices(body: CreateShipperPricesCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/shippers/create-prices", body, options);
}

/**
 * Gets a shiper's price list
 * `GET /shippers/price-list`
 */
export async function getShipperPriceList(params?: ShipperPriceListParams, options?: RequestOptions): Promise<ShipperPriceModelPagedListBaseResponse> {
  return apiClient.get<ShipperPriceModelPagedListBaseResponse>("/shippers/price-list", { ...options, query: params });
}

/**
 * Update a shipper's price
 * `PUT /shippers/update-price`
 */
export async function updateShipperPrice(body: UpdateShipperPriceCommand, options?: RequestOptions): Promise<ShipperPriceModelBaseResponse> {
  return apiClient.put<ShipperPriceModelBaseResponse>("/shippers/update-price", body, options);
}

/**
 * Delete a shipper's price
 * `DELETE /shippers/delete-price`
 */
export async function deleteShipperPrice(body: DeleteShipperPriceCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.delete<StringBaseResponse>("/shippers/delete-price", { ...options, body });
}
