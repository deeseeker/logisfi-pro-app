import { apiClient, type RequestOptions } from "../client";
import type {
  CollectionDashboardModelBaseResponse,
  CollectionListItemModelPagedListBaseResponse,
  PaymentModelListBaseResponse,
  RecordPaymentCommand,
  RecordPaymentResultModelBaseResponse,
} from "../types/models";
import type {
  CollectionsParams,
} from "../types/params";

/**
 * Record a payment against an invoice
 * `POST /collections/payments`
 */
export async function recordPayment(body: RecordPaymentCommand, options?: RequestOptions): Promise<RecordPaymentResultModelBaseResponse> {
  return apiClient.post<RecordPaymentResultModelBaseResponse>("/collections/payments", body, options);
}

/**
 * Retrieve paginated collections (receivables)
 * `GET /collections`
 */
export async function getCollections(params?: CollectionsParams, options?: RequestOptions): Promise<CollectionListItemModelPagedListBaseResponse> {
  return apiClient.get<CollectionListItemModelPagedListBaseResponse>("/collections", { ...options, query: params });
}

/**
 * Retrieve collections dashboard summary
 * `GET /collections/dashboard`
 */
export async function getCollectionsDashboard(options?: RequestOptions): Promise<CollectionDashboardModelBaseResponse> {
  return apiClient.get<CollectionDashboardModelBaseResponse>("/collections/dashboard", options);
}

/**
 * Retrieve payment history for an invoice
 * `GET /collections/invoices/{invoiceId}/payments`
 */
export async function getInvoicePayments(invoiceId: string, options?: RequestOptions): Promise<PaymentModelListBaseResponse> {
  return apiClient.get<PaymentModelListBaseResponse>(`/collections/invoices/${encodeURIComponent(invoiceId)}/payments`, options);
}
