import { apiClient, type RequestOptions } from "../client";
import type {
  CreateOrderCommand,
  FulfillOrderCommand,
  OrderModelPagedListBaseResponse,
  StringBaseResponse,
  UpdateOrderCommand,
} from "../types/models";
import type {
  OrdersParams,
} from "../types/params";

/**
 * Gets all orders paginated by given parameters
 * `GET /orders`
 */
export async function getOrders(params?: OrdersParams, options?: RequestOptions): Promise<OrderModelPagedListBaseResponse> {
  return apiClient.get<OrderModelPagedListBaseResponse>("/orders", { ...options, query: params });
}

/**
 * Create an order
 * `POST /orders`
 */
export async function createOrder(body: CreateOrderCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/orders", body, options);
}

/**
 * Update an order
 * `PUT /orders`
 */
export async function updateOrder(body: UpdateOrderCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.put<StringBaseResponse>("/orders", body, options);
}

/**
 * Fulfill an order
 * `POST /orders/fulfill`
 */
export async function fulfillOrder(body: FulfillOrderCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/orders/fulfill", body, options);
}
