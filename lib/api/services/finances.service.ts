import { apiClient, type RequestOptions } from "../client";
import type {
  AvailableLoanWalletsCommand,
  FundWithdrawalModelPagedListBaseResponse,
  GenerateInvoiceCommand,
  GenerateInvoiceFromSelectionCommand,
  GuidBaseResponse,
  InvoiceDashboardModelBaseResponse,
  InvoiceMiniModelPagedListBaseResponse,
  InvoiceModelBaseResponse,
  InvoicePaidCommand,
  RefreshInvoiceCommand,
  StringBaseResponse,
  TopUpLoanCommand,
  UnitBaseResponse,
  UpdateInvoiceCommand,
  WalletModelBaseResponse,
  WalletModelIEnumerableBaseResponse,
  WalletModelPagedListBaseResponse,
  WithdrawalCommand,
} from "../types/models";
import type {
  FundWithdrawalsParams,
  InvoiceDashboardParams,
  InvoicesParams,
  WalletsParams,
} from "../types/params";

/**
 * Retrieve paginated wallets
 * `GET /finances/wallets`
 */
export async function getWallets(params?: WalletsParams, options?: RequestOptions): Promise<WalletModelPagedListBaseResponse> {
  return apiClient.get<WalletModelPagedListBaseResponse>("/finances/wallets", { ...options, query: params });
}

/**
 * Top up loan
 * `POST /finances/top-up-loan`
 */
export async function topUpLoan(body: TopUpLoanCommand, options?: RequestOptions): Promise<WalletModelBaseResponse> {
  return apiClient.post<WalletModelBaseResponse>("/finances/top-up-loan", body, options);
}

/**
 * Retrieve available loan wallets to fund specified amount
 * `POST /finances/available-loan-wallets`
 */
export async function getAvailableLoanWallets(body: AvailableLoanWalletsCommand, options?: RequestOptions): Promise<WalletModelIEnumerableBaseResponse> {
  return apiClient.post<WalletModelIEnumerableBaseResponse>("/finances/available-loan-wallets", body, options);
}

/**
 * Generate invoice for a shipper
 * `POST /finances/generate-invoice`
 */
export async function generateInvoice(body: GenerateInvoiceCommand, options?: RequestOptions): Promise<GuidBaseResponse> {
  return apiClient.post<GuidBaseResponse>("/finances/generate-invoice", body, options);
}

/**
 * Generate invoice for a shipper from selected shipments (max 5)
 * `POST /finances/generate-invoice-from-selection`
 */
export async function generateInvoiceFromSelection(body: GenerateInvoiceFromSelectionCommand, options?: RequestOptions): Promise<GuidBaseResponse> {
  return apiClient.post<GuidBaseResponse>("/finances/generate-invoice-from-selection", body, options);
}

/**
 * Submit a generated invoice
 * `POST /finances/invoice/{id}/submit`
 */
export async function submitInvoice(id: string, options?: RequestOptions): Promise<UnitBaseResponse> {
  return apiClient.post<UnitBaseResponse>(`/finances/invoice/${encodeURIComponent(id)}/submit`, undefined, options);
}

/**
 * Mark a submitted invoice as due
 * `POST /finances/invoice/{id}/mark-due`
 */
export async function markInvoiceDue(id: string, options?: RequestOptions): Promise<UnitBaseResponse> {
  return apiClient.post<UnitBaseResponse>(`/finances/invoice/${encodeURIComponent(id)}/mark-due`, undefined, options);
}

/**
 * Close a paid invoice after settlement
 * `POST /finances/invoice/{id}/close`
 */
export async function closeInvoice(id: string, options?: RequestOptions): Promise<UnitBaseResponse> {
  return apiClient.post<UnitBaseResponse>(`/finances/invoice/${encodeURIComponent(id)}/close`, undefined, options);
}

/**
 * Cancel a non-paid invoice
 * `POST /finances/invoice/{id}/cancel`
 */
export async function cancelInvoice(id: string, options?: RequestOptions): Promise<UnitBaseResponse> {
  return apiClient.post<UnitBaseResponse>(`/finances/invoice/${encodeURIComponent(id)}/cancel`, undefined, options);
}

/**
 * Retrieve invoice by id
 * `GET /finances/invoice/{id}`
 */
export async function getInvoice(id: string, options?: RequestOptions): Promise<InvoiceModelBaseResponse> {
  return apiClient.get<InvoiceModelBaseResponse>(`/finances/invoice/${encodeURIComponent(id)}`, options);
}

/**
 * Update invoice dates (locked after submission; SuperAdmin override)
 * `PUT /finances/invoice/{id}`
 */
export async function updateInvoice(id: string, body: UpdateInvoiceCommand, options?: RequestOptions): Promise<UnitBaseResponse> {
  return apiClient.put<UnitBaseResponse>(`/finances/invoice/${encodeURIComponent(id)}`, body, options);
}

/**
 * Retrieve invoice dashboard summary
 * `GET /finances/invoice-dashboard`
 */
export async function getInvoiceDashboard(params?: InvoiceDashboardParams, options?: RequestOptions): Promise<InvoiceDashboardModelBaseResponse> {
  return apiClient.get<InvoiceDashboardModelBaseResponse>("/finances/invoice-dashboard", { ...options, query: params });
}

/**
 * Download invoice as PDF
 * `GET /finances/invoice/{id}/pdf`
 */
export async function downloadInvoicePdf(id: string, options?: RequestOptions): Promise<Blob> {
  return apiClient.get<Blob>(`/finances/invoice/${encodeURIComponent(id)}/pdf`, { ...options, parseAs: "blob" as const });
}

/**
 * Refresh invoice by adding new shipments
 * `POST /finances/refresh-invoice`
 */
export async function refreshInvoice(body: RefreshInvoiceCommand, options?: RequestOptions): Promise<UnitBaseResponse> {
  return apiClient.post<UnitBaseResponse>("/finances/refresh-invoice", body, options);
}

/**
 * Retrieve paginated invoices
 * `GET /finances/invoices`
 */
export async function getInvoices(params?: InvoicesParams, options?: RequestOptions): Promise<InvoiceMiniModelPagedListBaseResponse> {
  return apiClient.get<InvoiceMiniModelPagedListBaseResponse>("/finances/invoices", { ...options, query: params });
}

/**
 * Mark invoice as paid
 * `POST /finances/invoice-paid`
 */
export async function markInvoicePaid(body: InvoicePaidCommand, options?: RequestOptions): Promise<UnitBaseResponse> {
  return apiClient.post<UnitBaseResponse>("/finances/invoice-paid", body, options);
}

/**
 * Withdraw funds from wallet
 * `POST /finances/fund-withdrawal`
 */
export async function createFundWithdrawal(body: WithdrawalCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/finances/fund-withdrawal", body, options);
}

/**
 * Retrieve paginated withdrawals
 * `GET /finances/fund-withdrawals`
 */
export async function getFundWithdrawals(params?: FundWithdrawalsParams, options?: RequestOptions): Promise<FundWithdrawalModelPagedListBaseResponse> {
  return apiClient.get<FundWithdrawalModelPagedListBaseResponse>("/finances/fund-withdrawals", { ...options, query: params });
}
