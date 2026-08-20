"use client";

import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  getAdminSummary,
} from "../services/dashboard.service";
import {
  dashboardKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  AdminSummaryModelBaseResponse,
} from "../types/models";
import type {
  AdminSummaryParams,
} from "../types/params";

/**
 * Retrieve admin summary (WS-14: range-bound BRD metrics included; period/fromDate/toDate filter)
 */
export function useAdminSummary(params?: AdminSummaryParams, queryOptions?: Omit<UseQueryOptions<AdminSummaryModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: dashboardKeys.adminSummary(params),
    queryFn: () => getAdminSummary(params),
    ...queryOptions,
  });
}
