import { apiClient, type RequestOptions } from "../client";
import type {
  StringBaseResponse,
  WaybillConfirmationSummaryModelBaseResponse,
} from "../types/models";

/**
 * Get Waybill Confirmation Summary
 * `GET /confirmations/{token}`
 */
export async function getConfirmation(token: string, options?: RequestOptions): Promise<WaybillConfirmationSummaryModelBaseResponse> {
  return apiClient.get<WaybillConfirmationSummaryModelBaseResponse>(`/confirmations/${encodeURIComponent(token)}`, { ...options, auth: false });
}

/**
 * Confirm Waybill
 * `POST /confirmations/{token}/confirm`
 */
export async function confirmWaybill(token: string, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>(`/confirmations/${encodeURIComponent(token)}/confirm`, undefined, { ...options, auth: false });
}
