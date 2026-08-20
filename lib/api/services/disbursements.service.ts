import { apiClient, type RequestOptions } from "../client";
import type {
  DisbursementModelBaseResponse,
  DisbursementModelPagedListBaseResponse,
  ReverseDisbursementCommand,
} from "../types/models";
import type {
  DisbursementsParams,
} from "../types/params";

/**
 * Retrieve paginated disbursements (filter by status/type)
 * `GET /disbursements`
 */
export async function getDisbursements(params?: DisbursementsParams, options?: RequestOptions): Promise<DisbursementModelPagedListBaseResponse> {
  return apiClient.get<DisbursementModelPagedListBaseResponse>("/disbursements", { ...options, query: params });
}

/**
 * Retrieve a single disbursement by id
 * `GET /disbursements/{id}`
 */
export async function getDisbursement(id: string, options?: RequestOptions): Promise<DisbursementModelBaseResponse> {
  return apiClient.get<DisbursementModelBaseResponse>(`/disbursements/${encodeURIComponent(id)}`, options);
}

/**
 * Reverse a succeeded disbursement (posts a compensating credit to the source wallet)
 * `POST /disbursements/{id}/reverse`
 */
export async function reverseDisbursement(id: string, body: ReverseDisbursementCommand, options?: RequestOptions): Promise<DisbursementModelBaseResponse> {
  return apiClient.post<DisbursementModelBaseResponse>(`/disbursements/${encodeURIComponent(id)}/reverse`, body, options);
}

/**
 * Manually trigger a bank status inquiry for an Unknown/Submitted disbursement
 * `POST /disbursements/{id}/reconcile`
 */
export async function reconcileDisbursement(id: string, options?: RequestOptions): Promise<DisbursementModelBaseResponse> {
  return apiClient.post<DisbursementModelBaseResponse>(`/disbursements/${encodeURIComponent(id)}/reconcile`, undefined, options);
}
