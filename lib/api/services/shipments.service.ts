import { apiClient, type RequestOptions } from "../client";
import type {
  MobilizeShipmentCommand,
  ShipmentModelBaseResponse,
  ShipmentModelPagedListBaseResponse,
  StringBaseResponse,
  UpdateShipmentCommand,
} from "../types/models";
import type {
  ShipmentsParams,
} from "../types/params";

/**
 * Get Shipments
 * `GET /shipments`
 */
export async function getShipments(params?: ShipmentsParams, options?: RequestOptions): Promise<ShipmentModelPagedListBaseResponse> {
  return apiClient.get<ShipmentModelPagedListBaseResponse>("/shipments", { ...options, query: params });
}

/**
 * Get Shipment
 * `GET /shipments/{shipmentId}`
 */
export async function getShipment(shipmentId: string, options?: RequestOptions): Promise<ShipmentModelBaseResponse> {
  return apiClient.get<ShipmentModelBaseResponse>(`/shipments/${encodeURIComponent(shipmentId)}`, options);
}

/**
 * Update Shipment
 * `PUT /shipments/{shipmentId}`
 */
export async function updateShipment(shipmentId: string, body: UpdateShipmentCommand, options?: RequestOptions): Promise<ShipmentModelBaseResponse> {
  return apiClient.put<ShipmentModelBaseResponse>(`/shipments/${encodeURIComponent(shipmentId)}`, body, options);
}

/**
 * Mobilize Shipment
 * `POST /shipments/mobilize`
 */
export async function mobilizeShipment(body: MobilizeShipmentCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/shipments/mobilize", body, options);
}
