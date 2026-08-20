import { apiClient, type RequestOptions } from "../client";
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
 * `GET /analytics/shippers`
 */
export async function getShipperAnalytics(params?: ShipperAnalyticsParams, options?: RequestOptions): Promise<ShipperAnalyticsModelListBaseResponse> {
  return apiClient.get<ShipperAnalyticsModelListBaseResponse>("/analytics/shippers", { ...options, query: params });
}

/**
 * Route analytics: profitability, shipment count, total funded, composite risk score
 * `GET /analytics/routes`
 */
export async function getRouteAnalytics(params?: RouteAnalyticsParams, options?: RequestOptions): Promise<RouteAnalyticsModelListBaseResponse> {
  return apiClient.get<RouteAnalyticsModelListBaseResponse>("/analytics/routes", { ...options, query: params });
}

/**
 * Product analytics: shipment volume, total funded, average cycle, financing performance
 * `GET /analytics/products`
 */
export async function getProductAnalytics(params?: ProductAnalyticsParams, options?: RequestOptions): Promise<ProductAnalyticsModelListBaseResponse> {
  return apiClient.get<ProductAnalyticsModelListBaseResponse>("/analytics/products", { ...options, query: params });
}

/**
 * Carrier (vendor) analytics: funding utilization, delivery success rate, average repayment cycle
 * `GET /analytics/carriers`
 */
export async function getCarrierAnalytics(params?: CarrierAnalyticsParams, options?: RequestOptions): Promise<CarrierAnalyticsModelListBaseResponse> {
  return apiClient.get<CarrierAnalyticsModelListBaseResponse>("/analytics/carriers", { ...options, query: params });
}

/**
 * ANA thresholds: payment-cycle bucket counts (<25, 25-35, >35 days)
 * `GET /analytics/payment-cycle-buckets`
 */
export async function getPaymentCycleBuckets(params?: PaymentCycleBucketsParams, options?: RequestOptions): Promise<PaymentCycleBucketsModelBaseResponse> {
  return apiClient.get<PaymentCycleBucketsModelBaseResponse>("/analytics/payment-cycle-buckets", { ...options, query: params });
}
