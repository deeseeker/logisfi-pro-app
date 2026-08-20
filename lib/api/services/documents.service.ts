import { apiClient, type RequestOptions } from "../client";
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

function toDocumentFormData(body: UploadDocumentBody): FormData {
  const form = new FormData();
  form.append("file", body.file);
  if (body.documentType !== undefined) {
    form.append("documentType", body.documentType);
  }
  if (body.sourceEntityType !== undefined) {
    form.append("sourceEntityType", body.sourceEntityType);
  }
  if (body.sourceEntityId !== undefined) {
    form.append("sourceEntityId", body.sourceEntityId);
  }
  return form;
}

/**
 * List/search/filter documents (type, source record, upload date range, file name)
 * `GET /documents`
 */
export async function getDocuments(params?: DocumentsParams, options?: RequestOptions): Promise<DocumentModelPagedListBaseResponse> {
  return apiClient.get<DocumentModelPagedListBaseResponse>("/documents", { ...options, query: params });
}

/**
 * Upload a document (pdf/jpg/png, max 10MB), optionally linked to a source record
 * `POST /documents`
 */
export async function uploadDocument(body: UploadDocumentBody, options?: RequestOptions): Promise<DocumentModelBaseResponse> {
  return apiClient.post<DocumentModelBaseResponse>("/documents", toDocumentFormData(body), options);
}

/**
 * Download/stream a document (PDFs are served inline for preview)
 * `GET /documents/{documentId}/download`
 */
export async function downloadDocument(documentId: string, options?: RequestOptions): Promise<Blob> {
  return apiClient.get<Blob>(`/documents/${encodeURIComponent(documentId)}/download`, { ...options, parseAs: "blob" as const });
}

/**
 * Version history of the document chain for a source record (newest first)
 * `GET /documents/versions`
 */
export async function getDocumentVersions(params?: DocumentVersionsParams, options?: RequestOptions): Promise<DocumentModelListBaseResponse> {
  return apiClient.get<DocumentModelListBaseResponse>("/documents/versions", { ...options, query: params });
}

/**
 * Bulk download: bundle a set of documents (max 50) into a ZIP archive
 * `POST /documents/bulk-download`
 */
export async function bulkDownloadDocuments(body: DownloadDocumentsZipCommand, options?: RequestOptions): Promise<Blob> {
  return apiClient.post<Blob>("/documents/bulk-download", body, { ...options, parseAs: "blob" as const });
}
