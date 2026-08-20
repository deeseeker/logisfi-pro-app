import { apiClient, type RequestOptions } from "../client";
import type {
  DisputeSettlementCommand,
  GenerateSettlementCommand,
  ReconciliationDashboardModelBaseResponse,
  ReconciliationModelBaseResponse,
  ReconciliationModelPagedListBaseResponse,
  SettlementModelBaseResponse,
  SettlementModelPagedListBaseResponse,
} from "../types/models";
import type {
  DownloadReconciliationStatementParams,
  ReconciliationsParams,
  SettlementsParams,
} from "../types/params";

/**
 * Retrieve the reconciliation dashboard summary
 * `GET /reconciliation/dashboard`
 */
export async function getReconciliationDashboard(options?: RequestOptions): Promise<ReconciliationDashboardModelBaseResponse> {
  return apiClient.get<ReconciliationDashboardModelBaseResponse>("/reconciliation/dashboard", options);
}

/**
 * Retrieve paginated reconciliations (filterable by status and financing model; investors see their own organization only)
 * `GET /reconciliation/reconciliations`
 */
export async function getReconciliations(params?: ReconciliationsParams, options?: RequestOptions): Promise<ReconciliationModelPagedListBaseResponse> {
  return apiClient.get<ReconciliationModelPagedListBaseResponse>("/reconciliation/reconciliations", { ...options, query: params });
}

/**
 * Recompute the reconciliation row for a financed shipment (StaffAdmin/SuperAdmin only)
 * `POST /reconciliation/reconciliations/{shipmentId}/recompute`
 */
export async function recomputeReconciliation(shipmentId: string, options?: RequestOptions): Promise<ReconciliationModelBaseResponse> {
  return apiClient.post<ReconciliationModelBaseResponse>(`/reconciliation/reconciliations/${encodeURIComponent(shipmentId)}/recompute`, undefined, options);
}

/**
 * Retrieve paginated settlements (investors see their own organization only)
 * `GET /reconciliation/settlements`
 */
export async function getSettlements(params?: SettlementsParams, options?: RequestOptions): Promise<SettlementModelPagedListBaseResponse> {
  return apiClient.get<SettlementModelPagedListBaseResponse>("/reconciliation/settlements", { ...options, query: params });
}

/**
 * Generate a settlement for an investor over a period (StaffAdmin/SuperAdmin only)
 * `POST /reconciliation/settlements`
 */
export async function generateSettlement(body: GenerateSettlementCommand, options?: RequestOptions): Promise<SettlementModelBaseResponse> {
  return apiClient.post<SettlementModelBaseResponse>("/reconciliation/settlements", body, options);
}

/**
 * Confirm a pending settlement and post the payout ledger entries (Finance/SuperAdmin only)
 * `POST /reconciliation/settlements/{settlementId}/confirm`
 */
export async function confirmSettlement(settlementId: string, options?: RequestOptions): Promise<SettlementModelBaseResponse> {
  return apiClient.post<SettlementModelBaseResponse>(`/reconciliation/settlements/${encodeURIComponent(settlementId)}/confirm`, undefined, options);
}

/**
 * Dispute a pending settlement (investors may dispute their own; finance/admin may dispute any)
 * `POST /reconciliation/settlements/{settlementId}/dispute`
 */
export async function disputeSettlement(settlementId: string, body: DisputeSettlementCommand, options?: RequestOptions): Promise<SettlementModelBaseResponse> {
  return apiClient.post<SettlementModelBaseResponse>(`/reconciliation/settlements/${encodeURIComponent(settlementId)}/dispute`, body, options);
}

/**
 * Export a reconciliation statement for an investor + period (csv/pdf/excel)
 * `GET /reconciliation/statements`
 */
export async function downloadReconciliationStatement(params?: DownloadReconciliationStatementParams, options?: RequestOptions): Promise<Blob> {
  return apiClient.get<Blob>("/reconciliation/statements", { ...options, query: params, parseAs: "blob" as const });
}
