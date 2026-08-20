import { apiClient, type RequestOptions } from "../client";
import type {
  CreateRouteCommand,
  CreateRoutesCommand,
  RouteMiniModelBaseResponse,
  RouteMiniModelPagedListBaseResponse,
  StringBaseResponse,
  UpdateRouteCommand,
} from "../types/models";
import type {
  RoutesParams,
} from "../types/params";

/**
 * Gets all routes paginated by given parameters
 * `GET /routes`
 */
export async function getRoutes(params?: RoutesParams, options?: RequestOptions): Promise<RouteMiniModelPagedListBaseResponse> {
  return apiClient.get<RouteMiniModelPagedListBaseResponse>("/routes", { ...options, query: params });
}

/**
 * Create a route
 * `POST /routes`
 */
export async function createRoute(body: CreateRouteCommand, options?: RequestOptions): Promise<RouteMiniModelBaseResponse> {
  return apiClient.post<RouteMiniModelBaseResponse>("/routes", body, options);
}

/**
 * Update a route
 * `PUT /routes`
 */
export async function updateRoute(body: UpdateRouteCommand, options?: RequestOptions): Promise<RouteMiniModelBaseResponse> {
  return apiClient.put<RouteMiniModelBaseResponse>("/routes", body, options);
}

/**
 * Create routes in bulk
 * `POST /routes/bulk`
 */
export async function createRoutesBulk(body: CreateRoutesCommand, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.post<StringBaseResponse>("/routes/bulk", body, options);
}

/**
 * Delete a route
 * `DELETE /routes/{routeId}`
 */
export async function deleteRoute(routeId: string, options?: RequestOptions): Promise<StringBaseResponse> {
  return apiClient.delete<StringBaseResponse>(`/routes/${encodeURIComponent(routeId)}`, options);
}
