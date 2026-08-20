import { apiClient, type RequestOptions } from "../client";
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
 * `GET /vendors`
 */
export async function getVendors(params?: VendorsParams, options?: RequestOptions): Promise<VendorMiniModelPagedListBaseResponse> {
  return apiClient.get<VendorMiniModelPagedListBaseResponse>("/vendors", { ...options, query: params });
}

/**
 * Create a vendor
 * `POST /vendors`
 */
export async function createVendor(body: CreateVendorCommand, options?: RequestOptions): Promise<VendorMiniModelBaseResponse> {
  return apiClient.post<VendorMiniModelBaseResponse>("/vendors", body, options);
}

/**
 * Update a vendor
 * `PUT /vendors`
 */
export async function updateVendor(body: UpdateVendorCommand, options?: RequestOptions): Promise<VendorMiniModelBaseResponse> {
  return apiClient.put<VendorMiniModelBaseResponse>("/vendors", body, options);
}

/**
 * Create vendors in bulk
 * `POST /vendors/bulk`
 */
export async function createVendorsBulk(body: CreateVendorsCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/vendors/bulk", body, options);
}

/**
 * Delete a vendor
 * `DELETE /vendors/{vendorId}`
 */
export async function deleteVendor(vendorId: string, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.delete<StringBaseResponse>(`/vendors/${encodeURIComponent(vendorId)}`, options);
}

/**
 * Create vendor prices
 * `POST /vendors/create-prices`
 */
export async function createVendorPrices(body: CreateVendorPricesCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/vendors/create-prices", body, options);
}

/**
 * Gets a vendor's price list
 * `GET /vendors/price-list`
 */
export async function getVendorPriceList(params?: VendorPriceListParams, options?: RequestOptions): Promise<VendorPriceModelPagedListBaseResponse> {
  return apiClient.get<VendorPriceModelPagedListBaseResponse>("/vendors/price-list", { ...options, query: params });
}

/**
 * Update a vendor's price
 * `PUT /vendors/update-price`
 */
export async function updateVendorPrice(body: UpdateVendorPriceCommand, options?: RequestOptions): Promise<VendorPriceModelBaseResponse> {
  return apiClient.put<VendorPriceModelBaseResponse>("/vendors/update-price", body, options);
}

/**
 * Delete a vendor's price
 * `DELETE /vendors/delete-price`
 */
export async function deleteVendorPrice(body: DeleteVendorPriceCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.delete<StringBaseResponse>("/vendors/delete-price", { ...options, body });
}
