"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  getCollections,
  getCollectionsDashboard,
  getInvoicePayments,
  recordPayment,
} from "../services/collections.service";
import {
  collectionsKeys,
  financesKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
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
 * Retrieve paginated collections (receivables)
 */
export function useCollections(params?: CollectionsParams, queryOptions?: Omit<UseQueryOptions<CollectionListItemModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: collectionsKeys.collections(params),
    queryFn: () => getCollections(params),
    ...queryOptions,
  });
}

/**
 * Retrieve collections dashboard summary
 */
export function useCollectionsDashboard(queryOptions?: Omit<UseQueryOptions<CollectionDashboardModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: collectionsKeys.collectionsDashboard(),
    queryFn: () => getCollectionsDashboard(),
    ...queryOptions,
  });
}

/**
 * Retrieve payment history for an invoice
 */
export function useInvoicePayments(invoiceId: string, queryOptions?: Omit<UseQueryOptions<PaymentModelListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: collectionsKeys.invoicePayments(invoiceId),
    queryFn: () => getInvoicePayments(invoiceId),
    enabled: Boolean(invoiceId) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

export interface RecordPaymentVariables {
  body: RecordPaymentCommand;
}

/**
 * Record a payment against an invoice
 */
export function useRecordPayment(mutationOptions?: UseMutationOptions<RecordPaymentResultModelBaseResponse, ApiError, RecordPaymentVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: RecordPaymentVariables) => recordPayment(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
