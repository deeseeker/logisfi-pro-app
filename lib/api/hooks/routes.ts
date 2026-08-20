"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createRoute,
  createRoutesBulk,
  deleteRoute,
  getRoutes,
  updateRoute,
} from "../services/routes.service";
import {
  routeKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
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
 */
export function useRoutes(params?: RoutesParams, queryOptions?: Omit<UseQueryOptions<RouteMiniModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: routeKeys.routes(params),
    queryFn: () => getRoutes(params),
    ...queryOptions,
  });
}

export interface CreateRouteVariables {
  body: CreateRouteCommand;
}

/**
 * Create a route
 */
export function useCreateRoute(mutationOptions?: UseMutationOptions<RouteMiniModelBaseResponse, ApiError, CreateRouteVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateRouteVariables) => createRoute(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: routeKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateRouteVariables {
  body: UpdateRouteCommand;
}

/**
 * Update a route
 */
export function useUpdateRoute(mutationOptions?: UseMutationOptions<RouteMiniModelBaseResponse, ApiError, UpdateRouteVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateRouteVariables) => updateRoute(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: routeKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CreateRoutesBulkVariables {
  body: CreateRoutesCommand;
}

/**
 * Create routes in bulk
 */
export function useCreateRoutesBulk(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateRoutesBulkVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateRoutesBulkVariables) => createRoutesBulk(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: routeKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DeleteRouteVariables {
  routeId: string;
}

/**
 * Delete a route
 */
export function useDeleteRoute(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, DeleteRouteVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: DeleteRouteVariables) => deleteRoute(variables.routeId),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: routeKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
