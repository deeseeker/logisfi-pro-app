"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  getAuditReport,
  getCollectionsReport,
  getCreditExposureReport,
  getPortfolioReport,
} from "../services/reports.service";
import type { ApiError } from "../errors";
import type {
  AuditReportParams,
  CollectionsReportParams,
  CreditExposureReportParams,
  PortfolioReportParams,
} from "../types/params";

export interface PortfolioReportVariables {
  params?: PortfolioReportParams;
}

/**
 * Portfolio report (daily/weekly/monthly funded, repaid, exposure) for a date range.
 * Swagger marks this response as binary, so it is fetched on demand.
 */
export function usePortfolioReport(
  mutationOptions?: UseMutationOptions<Blob, ApiError, PortfolioReportVariables>
) {
  return useMutation({
    ...mutationOptions,
    mutationFn: (variables: PortfolioReportVariables) =>
      getPortfolioReport(variables.params),
  });
}

export interface CreditExposureReportVariables {
  params?: CreditExposureReportParams;
}

/**
 * Credit report: exposure by shipper, carrier or route.
 * Swagger marks this response as binary, so it is fetched on demand.
 */
export function useCreditExposureReport(
  mutationOptions?: UseMutationOptions<
    Blob,
    ApiError,
    CreditExposureReportVariables
  >
) {
  return useMutation({
    ...mutationOptions,
    mutationFn: (variables: CreditExposureReportVariables) =>
      getCreditExposureReport(variables.params),
  });
}

export interface CollectionsReportVariables {
  params?: CollectionsReportParams;
}

/**
 * Collection report: due invoices, overdue invoices, collection performance.
 * Swagger marks this response as binary, so it is fetched on demand.
 */
export function useCollectionsReport(
  mutationOptions?: UseMutationOptions<
    Blob,
    ApiError,
    CollectionsReportVariables
  >
) {
  return useMutation({
    ...mutationOptions,
    mutationFn: (variables: CollectionsReportVariables) =>
      getCollectionsReport(variables.params),
  });
}

export interface AuditReportVariables {
  params?: AuditReportParams;
}

/**
 * Audit report: disbursements, recoveries, closed transactions, entity-change trail.
 * Swagger marks this response as binary, so it is fetched on demand.
 */
export function useAuditReport(
  mutationOptions?: UseMutationOptions<Blob, ApiError, AuditReportVariables>
) {
  return useMutation({
    ...mutationOptions,
    mutationFn: (variables: AuditReportVariables) =>
      getAuditReport(variables.params),
  });
}
