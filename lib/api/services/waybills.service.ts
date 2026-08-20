import { apiClient, type RequestOptions } from "../client";
import type {
  CreateWaybillConfirmationCommand,
  WaybillModelBaseResponse,
} from "../types/models";

/**
 * Create Waybill & Send Confirmation Request
 * `POST /waybills/confirmation`
 */
export async function createWaybillConfirmation(body: CreateWaybillConfirmationCommand, options?: RequestOptions): Promise<WaybillModelBaseResponse> {
  return apiClient.post<WaybillModelBaseResponse>("/waybills/confirmation", body, options);
}
