"use client";

import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  getCarrierAnalytics,
  getPaymentCycleBuckets,
  getProductAnalytics,
  getRouteAnalytics,
  getShipperAnalytics,
} from "../services/analytics.service";
import {
  analyticsKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  CarrierAnalyticsModelListBaseResponse,
  PaymentCycleBucketsModelBaseResponse,
  ProductAnalyticsModelListBaseResponse,
  RouteAnalyticsModelListBaseResponse,
  ShipperAnalyticsModelListBaseResponse,
} from "../types/models";
import type {
  CarrierAnalyticsParams,
  PaymentCycleBucketsParams,
  ProductAnalyticsParams,
  RouteAnalyticsParams,
  ShipperAnalyticsParams,
} from "../types/params";

/**
 * Shipper analytics: total funded, total repaid, average payment cycle, days outstanding, funded-vs-repaid series
 */
export function useShipperAnalytics(params?: ShipperAnalyticsParams, queryOptions?: Omit<UseQueryOptions<ShipperAnalyticsModelListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: analyticsKeys.shipperAnalytics(params),
    queryFn: () => getShipperAnalytics(params),
    ...queryOptions,
  });
}

/**
 * Route analytics: profitability, shipment count, total funded, composite risk score
 */
export function useRouteAnalytics(params?: RouteAnalyticsParams, queryOptions?: Omit<UseQueryOptions<RouteAnalyticsModelListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: analyticsKeys.routeAnalytics(params),
    queryFn: () => getRouteAnalytics(params),
    ...queryOptions,
  });
}

/**
 * Product analytics: shipment volume, total funded, average cycle, financing performance
 */
export function useProductAnalytics(params?: ProductAnalyticsParams, queryOptions?: Omit<UseQueryOptions<ProductAnalyticsModelListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: analyticsKeys.productAnalytics(params),
    queryFn: () => getProductAnalytics(params),
    ...queryOptions,
  });
}

/**
 * Carrier (vendor) analytics: funding utilization, delivery success rate, average repayment cycle
 */
export function useCarrierAnalytics(params?: CarrierAnalyticsParams, queryOptions?: Omit<UseQueryOptions<CarrierAnalyticsModelListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: analyticsKeys.carrierAnalytics(params),
    queryFn: () => getCarrierAnalytics(params),
    ...queryOptions,
  });
}

/**
 * ANA thresholds: payment-cycle bucket counts (<25, 25-35, >35 days)
 */
export function usePaymentCycleBuckets(params?: PaymentCycleBucketsParams, queryOptions?: Omit<UseQueryOptions<PaymentCycleBucketsModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: analyticsKeys.paymentCycleBuckets(params),
    queryFn: () => getPaymentCycleBuckets(params),
    ...queryOptions,
  });
}
