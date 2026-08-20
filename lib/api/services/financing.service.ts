import { apiClient, type RequestOptions } from "../client";
import type {
  FinancingConfigurationModelBaseResponse,
  FinancingRequestModelBaseResponse,
  FinancingRequestModelPagedListBaseResponse,
  InvestorCardSummaryModelBaseResponse,
  RejectFinancingRequestCommand,
  SubmitFinancingRequestCommand,
  UpsertFinancingConfigurationCommand,
} from "../types/models";
import type {
  FinancingRequestsParams,
} from "../types/params";

/**
 * Retrieve paginated financing requests (investors see their own organization only)
 * `GET /financing/requests`
 */
export async function getFinancingRequests(params?: FinancingRequestsParams, options?: RequestOptions): Promise<FinancingRequestModelPagedListBaseResponse> {
  return apiClient.get<FinancingRequestModelPagedListBaseResponse>("/financing/requests", { ...options, query: params });
}

/**
 * Submit a financing request for a confirmed waybill
 * `POST /financing/requests`
 */
export async function submitFinancingRequest(body: SubmitFinancingRequestCommand, options?: RequestOptions): Promise<FinancingRequestModelBaseResponse> {
  return apiClient.post<FinancingRequestModelBaseResponse>("/financing/requests", body, options);
}

/**
 * Approve a pending financing request and trigger disbursement
 * `POST /financing/requests/{id}/approve`
 */
export async function approveFinancingRequest(id: string, options?: RequestOptions): Promise<FinancingRequestModelBaseResponse> {
  return apiClient.post<FinancingRequestModelBaseResponse>(`/financing/requests/${encodeURIComponent(id)}/approve`, undefined, options);
}

/**
 * Reject a pending financing request
 * `POST /financing/requests/{id}/reject`
 */
export async function rejectFinancingRequest(id: string, body: RejectFinancingRequestCommand, options?: RequestOptions): Promise<FinancingRequestModelBaseResponse> {
  return apiClient.post<FinancingRequestModelBaseResponse>(`/financing/requests/${encodeURIComponent(id)}/reject`, body, options);
}

/**
 * Retrieve the effective financing configuration for an organization
 * `GET /financing/configurations/{orgId}`
 */
export async function getFinancingConfiguration(orgId: string, options?: RequestOptions): Promise<FinancingConfigurationModelBaseResponse> {
  return apiClient.get<FinancingConfigurationModelBaseResponse>(`/financing/configurations/${encodeURIComponent(orgId)}`, options);
}

/**
 * Upsert an effective-dated financing configuration (SuperAdmin/StaffAdmin only)
 * `PUT /financing/configurations/{orgId}`
 */
export async function upsertFinancingConfiguration(orgId: string, body: UpsertFinancingConfigurationCommand, options?: RequestOptions): Promise<FinancingConfigurationModelBaseResponse> {
  return apiClient.put<FinancingConfigurationModelBaseResponse>(`/financing/configurations/${encodeURIComponent(orgId)}`, body, options);
}

/**
 * Retrieve investor card summary (wallet, exposure, utilization, active shipments)
 * `GET /investors/{orgId}/summary`
 */
export async function getInvestorSummary(orgId: string, options?: RequestOptions): Promise<InvestorCardSummaryModelBaseResponse> {
  return apiClient.get<InvestorCardSummaryModelBaseResponse>(`/investors/${encodeURIComponent(orgId)}/summary`, options);
}
