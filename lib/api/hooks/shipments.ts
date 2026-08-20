"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  getShipment,
  getShipments,
  mobilizeShipment,
  updateShipment,
} from "../services/shipments.service";
import {
  financesKeys,
  organizationKeys,
  shipmentKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
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
 */
export function useShipments(params?: ShipmentsParams, queryOptions?: Omit<UseQueryOptions<ShipmentModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: shipmentKeys.shipments(params),
    queryFn: () => getShipments(params),
    ...queryOptions,
  });
}

/**
 * Get Shipment
 */
export function useShipment(shipmentId: string, queryOptions?: Omit<UseQueryOptions<ShipmentModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: shipmentKeys.shipment(shipmentId),
    queryFn: () => getShipment(shipmentId),
    enabled: Boolean(shipmentId) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

export interface UpdateShipmentVariables {
  shipmentId: string;
  body: UpdateShipmentCommand;
}

/**
 * Update Shipment
 */
export function useUpdateShipment(mutationOptions?: UseMutationOptions<ShipmentModelBaseResponse, ApiError, UpdateShipmentVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateShipmentVariables) => updateShipment(variables.shipmentId, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface MobilizeShipmentVariables {
  body: MobilizeShipmentCommand;
}

/**
 * Mobilize Shipment
 */
export function useMobilizeShipment(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, MobilizeShipmentVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: MobilizeShipmentVariables) => mobilizeShipment(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: shipmentKeys.all });
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
