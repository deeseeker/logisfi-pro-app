import { apiClient, type RequestOptions } from "../client";
import type {
  ConfirmDeliveryCommand,
  ConfirmOffloadingCommand,
  DeliveryConfirmationModelBaseResponse,
  FinalPaymentRequestModelBaseResponse,
  FinalPaymentRequestModelPagedListBaseResponse,
  RejectFinalPaymentCommand,
  RequestFinalPaymentCommand,
} from "../types/models";
import type {
  FinalPaymentsParams,
} from "../types/params";

/**
 * Confirm physical delivery of a financed/mobilized shipment (creates/updates the DeliveryConfirmation; does not touch ShipmentStatus). Idempotent.
 * `POST /deliveries/confirm`
 */
export async function confirmDelivery(body: ConfirmDeliveryCommand, options?: RequestOptions): Promise<DeliveryConfirmationModelBaseResponse> {
  return apiClient.post<DeliveryConfirmationModelBaseResponse>("/deliveries/confirm", body, options);
}

/**
 * Confirm offloading of a financed/mobilized shipment at destination. Idempotent.
 * `POST /deliveries/offload`
 */
export async function confirmOffloading(body: ConfirmOffloadingCommand, options?: RequestOptions): Promise<DeliveryConfirmationModelBaseResponse> {
  return apiClient.post<DeliveryConfirmationModelBaseResponse>("/deliveries/offload", body, options);
}

/**
 * Retrieve the delivery confirmation for a shipment
 * `GET /deliveries/{shipmentId}`
 */
export async function getDelivery(shipmentId: string, options?: RequestOptions): Promise<DeliveryConfirmationModelBaseResponse> {
  return apiClient.get<DeliveryConfirmationModelBaseResponse>(`/deliveries/${encodeURIComponent(shipmentId)}`, options);
}

/**
 * Retrieve paginated final payment requests (filterable by shipment, vendor and status)
 * `GET /final-payments`
 */
export async function getFinalPayments(params?: FinalPaymentsParams, options?: RequestOptions): Promise<FinalPaymentRequestModelPagedListBaseResponse> {
  return apiClient.get<FinalPaymentRequestModelPagedListBaseResponse>("/final-payments", { ...options, query: params });
}

/**
 * Request the final (balance) vendor payment for a delivered shipment. Amount = VendorPrice − total mobilized. Idempotent per shipment.
 * `POST /final-payments`
 */
export async function requestFinalPayment(body: RequestFinalPaymentCommand, options?: RequestOptions): Promise<FinalPaymentRequestModelBaseResponse> {
  return apiClient.post<FinalPaymentRequestModelBaseResponse>("/final-payments", body, options);
}

/**
 * Approve a pending final payment and disburse the balance to the vendor (Finance/SuperAdmin only)
 * `POST /final-payments/{id}/approve`
 */
export async function approveFinalPayment(id: string, options?: RequestOptions): Promise<FinalPaymentRequestModelBaseResponse> {
  return apiClient.post<FinalPaymentRequestModelBaseResponse>(`/final-payments/${encodeURIComponent(id)}/approve`, undefined, options);
}

/**
 * Reject a pending final payment with a reason (Finance/SuperAdmin only)
 * `POST /final-payments/{id}/reject`
 */
export async function rejectFinalPayment(id: string, body: RejectFinalPaymentCommand, options?: RequestOptions): Promise<FinalPaymentRequestModelBaseResponse> {
  return apiClient.post<FinalPaymentRequestModelBaseResponse>(`/final-payments/${encodeURIComponent(id)}/reject`, body, options);
}
