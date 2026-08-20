"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  cancelInvoice,
  closeInvoice,
  createFundWithdrawal,
  downloadInvoicePdf,
  generateInvoice,
  generateInvoiceFromSelection,
  getAvailableLoanWallets,
  getFundWithdrawals,
  getInvoice,
  getInvoiceDashboard,
  getInvoices,
  getWallets,
  markInvoiceDue,
  markInvoicePaid,
  refreshInvoice,
  submitInvoice,
  topUpLoan,
  updateInvoice,
} from "../services/finances.service";
import {
  collectionsKeys,
  financesKeys,
  organizationKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  AvailableLoanWalletsCommand,
  FundWithdrawalModelPagedListBaseResponse,
  GenerateInvoiceCommand,
  GenerateInvoiceFromSelectionCommand,
  GuidBaseResponse,
  InvoiceDashboardModelBaseResponse,
  InvoiceMiniModelPagedListBaseResponse,
  InvoiceModelBaseResponse,
  InvoicePaidCommand,
  RefreshInvoiceCommand,
  StringBaseResponse,
  TopUpLoanCommand,
  UnitBaseResponse,
  UpdateInvoiceCommand,
  WalletModelBaseResponse,
  WalletModelIEnumerableBaseResponse,
  WalletModelPagedListBaseResponse,
  WithdrawalCommand,
} from "../types/models";
import type {
  FundWithdrawalsParams,
  InvoiceDashboardParams,
  InvoicesParams,
  WalletsParams,
} from "../types/params";

/**
 * Retrieve paginated wallets
 */
export function useWallets(params?: WalletsParams, queryOptions?: Omit<UseQueryOptions<WalletModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financesKeys.wallets(params),
    queryFn: () => getWallets(params),
    ...queryOptions,
  });
}

/**
 * Retrieve invoice by id
 */
export function useInvoice(id: string, queryOptions?: Omit<UseQueryOptions<InvoiceModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financesKeys.invoice(id),
    queryFn: () => getInvoice(id),
    enabled: Boolean(id) && (queryOptions?.enabled ?? true),
    ...queryOptions,
  });
}

/**
 * Retrieve invoice dashboard summary
 */
export function useInvoiceDashboard(params?: InvoiceDashboardParams, queryOptions?: Omit<UseQueryOptions<InvoiceDashboardModelBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financesKeys.invoiceDashboard(params),
    queryFn: () => getInvoiceDashboard(params),
    ...queryOptions,
  });
}

/**
 * Retrieve paginated invoices
 */
export function useInvoices(params?: InvoicesParams, queryOptions?: Omit<UseQueryOptions<InvoiceMiniModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financesKeys.invoices(params),
    queryFn: () => getInvoices(params),
    ...queryOptions,
  });
}

/**
 * Retrieve paginated withdrawals
 */
export function useFundWithdrawals(params?: FundWithdrawalsParams, queryOptions?: Omit<UseQueryOptions<FundWithdrawalModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: financesKeys.fundWithdrawals(params),
    queryFn: () => getFundWithdrawals(params),
    ...queryOptions,
  });
}

export interface TopUpLoanVariables {
  body: TopUpLoanCommand;
}

/**
 * Top up loan
 */
export function useTopUpLoan(mutationOptions?: UseMutationOptions<WalletModelBaseResponse, ApiError, TopUpLoanVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: TopUpLoanVariables) => topUpLoan(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface GetAvailableLoanWalletsVariables {
  body: AvailableLoanWalletsCommand;
}

/**
 * Retrieve available loan wallets to fund specified amount
 */
export function useAvailableLoanWallets(mutationOptions?: UseMutationOptions<WalletModelIEnumerableBaseResponse, ApiError, GetAvailableLoanWalletsVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: GetAvailableLoanWalletsVariables) => getAvailableLoanWallets(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface GenerateInvoiceVariables {
  body: GenerateInvoiceCommand;
}

/**
 * Generate invoice for a shipper
 */
export function useGenerateInvoice(mutationOptions?: UseMutationOptions<GuidBaseResponse, ApiError, GenerateInvoiceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: GenerateInvoiceVariables) => generateInvoice(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface GenerateInvoiceFromSelectionVariables {
  body: GenerateInvoiceFromSelectionCommand;
}

/**
 * Generate invoice for a shipper from selected shipments (max 5)
 */
export function useGenerateInvoiceFromSelection(mutationOptions?: UseMutationOptions<GuidBaseResponse, ApiError, GenerateInvoiceFromSelectionVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: GenerateInvoiceFromSelectionVariables) => generateInvoiceFromSelection(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface SubmitInvoiceVariables {
  id: string;
}

/**
 * Submit a generated invoice
 */
export function useSubmitInvoice(mutationOptions?: UseMutationOptions<UnitBaseResponse, ApiError, SubmitInvoiceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: SubmitInvoiceVariables) => submitInvoice(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface MarkInvoiceDueVariables {
  id: string;
}

/**
 * Mark a submitted invoice as due
 */
export function useMarkInvoiceDue(mutationOptions?: UseMutationOptions<UnitBaseResponse, ApiError, MarkInvoiceDueVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: MarkInvoiceDueVariables) => markInvoiceDue(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CloseInvoiceVariables {
  id: string;
}

/**
 * Close a paid invoice after settlement
 */
export function useCloseInvoice(mutationOptions?: UseMutationOptions<UnitBaseResponse, ApiError, CloseInvoiceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CloseInvoiceVariables) => closeInvoice(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CancelInvoiceVariables {
  id: string;
}

/**
 * Cancel a non-paid invoice
 */
export function useCancelInvoice(mutationOptions?: UseMutationOptions<UnitBaseResponse, ApiError, CancelInvoiceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CancelInvoiceVariables) => cancelInvoice(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface UpdateInvoiceVariables {
  id: string;
  body: UpdateInvoiceCommand;
}

/**
 * Update invoice dates (locked after submission; SuperAdmin override)
 */
export function useUpdateInvoice(mutationOptions?: UseMutationOptions<UnitBaseResponse, ApiError, UpdateInvoiceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateInvoiceVariables) => updateInvoice(variables.id, variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DownloadInvoicePdfVariables {
  id: string;
}

/**
 * Download invoice as PDF
 */
export function useDownloadInvoicePdf(mutationOptions?: UseMutationOptions<Blob, ApiError, DownloadInvoicePdfVariables>) {
  return useMutation({
    mutationFn: (variables: DownloadInvoicePdfVariables) => downloadInvoicePdf(variables.id),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface RefreshInvoiceVariables {
  body: RefreshInvoiceCommand;
}

/**
 * Refresh invoice by adding new shipments
 */
export function useRefreshInvoice(mutationOptions?: UseMutationOptions<UnitBaseResponse, ApiError, RefreshInvoiceVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: RefreshInvoiceVariables) => refreshInvoice(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface MarkInvoicePaidVariables {
  body: InvoicePaidCommand;
}

/**
 * Mark invoice as paid
 */
export function useMarkInvoicePaid(mutationOptions?: UseMutationOptions<UnitBaseResponse, ApiError, MarkInvoicePaidVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: MarkInvoicePaidVariables) => markInvoicePaid(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface CreateFundWithdrawalVariables {
  body: WithdrawalCommand;
}

/**
 * Withdraw funds from wallet
 */
export function useCreateFundWithdrawal(mutationOptions?: UseMutationOptions<StringBaseResponse, ApiError, CreateFundWithdrawalVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: CreateFundWithdrawalVariables) => createFundWithdrawal(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: financesKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
