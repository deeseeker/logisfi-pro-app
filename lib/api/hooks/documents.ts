"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  bulkDownloadDocuments,
  downloadDocument,
  getDocumentVersions,
  getDocuments,
  uploadDocument,
} from "../services/documents.service";
import {
  documentKeys,
} from "../query-keys";
import type { ApiError } from "../errors";
import type {
  DocumentModelBaseResponse,
  DocumentModelListBaseResponse,
  DocumentModelPagedListBaseResponse,
  DownloadDocumentsZipCommand,
  UploadDocumentBody,
} from "../types/models";
import type {
  DocumentVersionsParams,
  DocumentsParams,
} from "../types/params";

/**
 * List/search/filter documents (type, source record, upload date range, file name)
 */
export function useDocuments(params?: DocumentsParams, queryOptions?: Omit<UseQueryOptions<DocumentModelPagedListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: documentKeys.documents(params),
    queryFn: () => getDocuments(params),
    ...queryOptions,
  });
}

/**
 * Version history of the document chain for a source record (newest first)
 */
export function useDocumentVersions(params?: DocumentVersionsParams, queryOptions?: Omit<UseQueryOptions<DocumentModelListBaseResponse, ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: documentKeys.documentVersions(params),
    queryFn: () => getDocumentVersions(params),
    ...queryOptions,
  });
}

export interface UploadDocumentVariables {
  body: UploadDocumentBody;
}

/**
 * Upload a document (pdf/jpg/png, max 10MB), optionally linked to a source record
 */
export function useUploadDocument(mutationOptions?: UseMutationOptions<DocumentModelBaseResponse, ApiError, UploadDocumentVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UploadDocumentVariables) => uploadDocument(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: documentKeys.all });
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface DownloadDocumentVariables {
  documentId: string;
}

/**
 * Download/stream a document (PDFs are served inline for preview)
 */
export function useDownloadDocument(mutationOptions?: UseMutationOptions<Blob, ApiError, DownloadDocumentVariables>) {
  return useMutation({
    mutationFn: (variables: DownloadDocumentVariables) => downloadDocument(variables.documentId),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export interface BulkDownloadDocumentsVariables {
  body: DownloadDocumentsZipCommand;
}

/**
 * Bulk download: bundle a set of documents (max 50) into a ZIP archive
 */
export function useBulkDownloadDocuments(mutationOptions?: UseMutationOptions<Blob, ApiError, BulkDownloadDocumentsVariables>) {
  return useMutation({
    mutationFn: (variables: BulkDownloadDocumentsVariables) => bulkDownloadDocuments(variables.body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
