import { apiClient, type RequestOptions } from "../client";
import type {
  AuditReportParams,
  CollectionsReportParams,
  CreditExposureReportParams,
  PortfolioReportParams,
} from "../types/params";

/**
 * Portfolio report (daily/weekly/monthly funded, repaid, exposure) for a date range
 * `GET /reports/portfolio`
 */
export async function getPortfolioReport(params?: PortfolioReportParams, options?: RequestOptions): Promise<Blob> {
  return apiClient.get<Blob>("/reports/portfolio", { ...options, query: params, parseAs: "blob" as const });
}

/**
 * Credit report: exposure by shipper, carrier or route
 * `GET /reports/credit-exposure`
 */
export async function getCreditExposureReport(params?: CreditExposureReportParams, options?: RequestOptions): Promise<Blob> {
  return apiClient.get<Blob>("/reports/credit-exposure", { ...options, query: params, parseAs: "blob" as const });
}

/**
 * Collection report: due invoices, overdue invoices, collection performance
 * `GET /reports/collections`
 */
export async function getCollectionsReport(params?: CollectionsReportParams, options?: RequestOptions): Promise<Blob> {
  return apiClient.get<Blob>("/reports/collections", { ...options, query: params, parseAs: "blob" as const });
}

/**
 * Audit report: disbursements, recoveries, closed transactions, entity-change trail
 * `GET /reports/audit`
 */
export async function getAuditReport(params?: AuditReportParams, options?: RequestOptions): Promise<Blob> {
  return apiClient.get<Blob>("/reports/audit", { ...options, query: params, parseAs: "blob" as const });
}
