import { apiClient, type RequestOptions } from "../client";
import type {
  AdminSummaryModelBaseResponse,
} from "../types/models";
import type {
  AdminSummaryParams,
} from "../types/params";

/**
 * Retrieve admin summary (WS-14: range-bound BRD metrics included; period/fromDate/toDate filter)
 * `GET /dashboard/admin-summary`
 */
export async function getAdminSummary(params?: AdminSummaryParams, options?: RequestOptions): Promise<AdminSummaryModelBaseResponse> {
  return apiClient.get<AdminSummaryModelBaseResponse>("/dashboard/admin-summary", { ...options, query: params });
}
