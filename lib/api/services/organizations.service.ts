import { apiClient, type RequestOptions } from "../client";
import type {
  AddOrganizationCommand,
  InvestmentModelPagedListBaseResponse,
  MobilizationModelPagedListBaseResponse,
  OrganizationModelBaseResponse,
  OrganizationModelPagedListBaseResponse,
  StringBaseResponse,
  TransactionModelPagedListBaseResponse,
  UpdateOrganizationCommand,
  WalletModelBaseResponse,
} from "../types/models";
import type {
  InvestmentsParams,
  MobilizationsParams,
  OrganizationsParams,
  TransactionsParams,
} from "../types/params";

/**
 * Get organizations
 * `GET /organizations`
 */
export async function getOrganizations(params?: OrganizationsParams, options?: RequestOptions): Promise<OrganizationModelPagedListBaseResponse> {
  return apiClient.get<OrganizationModelPagedListBaseResponse>("/organizations", { ...options, query: params });
}

/**
 * Create organization
 * `POST /organizations`
 */
export async function createOrganization(body: AddOrganizationCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/organizations", body, options);
}

/**
 * Get organization
 * `GET /organizations/{id}`
 */
export async function getOrganization(id: string, options?: RequestOptions): Promise<OrganizationModelBaseResponse> {
  return apiClient.get<OrganizationModelBaseResponse>(`/organizations/${encodeURIComponent(id)}`, options);
}

/**
 * Update organization
 * `PUT /organizations/{id}`
 */
export async function updateOrganization(id: string, body: UpdateOrganizationCommand, options?: RequestOptions): Promise<OrganizationModelBaseResponse> {
  return apiClient.put<OrganizationModelBaseResponse>(`/organizations/${encodeURIComponent(id)}`, body, options);
}

/**
 * Delete organization
 * `DELETE /organizations/{id}`
 */
export async function deleteOrganization(id: string, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.delete<StringBaseResponse>(`/organizations/${encodeURIComponent(id)}`, options);
}

/**
 * Get investments
 * `GET /organizations/investments`
 */
export async function getInvestments(params?: InvestmentsParams, options?: RequestOptions): Promise<InvestmentModelPagedListBaseResponse> {
  return apiClient.get<InvestmentModelPagedListBaseResponse>("/organizations/investments", { ...options, query: params });
}

/**
 * Get mobilizations
 * `GET /organizations/mobilizations`
 */
export async function getMobilizations(params?: MobilizationsParams, options?: RequestOptions): Promise<MobilizationModelPagedListBaseResponse> {
  return apiClient.get<MobilizationModelPagedListBaseResponse>("/organizations/mobilizations", { ...options, query: params });
}

/**
 * Get transactions
 * `GET /organizations/transactions`
 */
export async function getTransactions(params?: TransactionsParams, options?: RequestOptions): Promise<TransactionModelPagedListBaseResponse> {
  return apiClient.get<TransactionModelPagedListBaseResponse>("/organizations/transactions", { ...options, query: params });
}

/**
 * Get wallet
 * `GET /organizations/{organizationId}/wallet`
 */
export async function getOrganizationWallet(organizationId: string, options?: RequestOptions): Promise<WalletModelBaseResponse> {
  return apiClient.get<WalletModelBaseResponse>(`/organizations/${encodeURIComponent(organizationId)}/wallet`, options);
}
