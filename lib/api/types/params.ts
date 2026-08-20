import type {
  DateRangePeriod,
  DisbursementStatus,
  DisbursementType,
  DocumentType,
  FinalPaymentStatus,
  FinancingModel,
  FinancingRequestStatus,
  InvoiceStatus,
  MobilizationStatus,
  OrderStatus,
  PortfolioGranularity,
  ReconciliationStatus,
  SettlementStatus,
  ShipmentMobilizationStatus,
  ShipmentStatus,
  StatementFormat,
  WithdrawalStatus,
  WithdrawalType,
} from "./enums";

/** Query-parameter DTOs. Names match the OpenAPI spec (PascalCase included). */

export interface ShipperAnalyticsParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
  shipperId?: string;
}

export interface RouteAnalyticsParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
}

export interface ProductAnalyticsParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
}

export interface CarrierAnalyticsParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
}

export interface PaymentCycleBucketsParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
}

export interface CollectionsParams {
  InvoiceStatus?: InvoiceStatus;
  ShipperId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface AdminSummaryParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
}

export interface FinalPaymentsParams {
  ShipmentId?: string;
  VendorId?: string;
  Status?: FinalPaymentStatus;
  PageNumber?: number;
  PageSize?: number;
}

export interface DisbursementsParams {
  Status?: DisbursementStatus;
  Type?: DisbursementType;
  PageNumber?: number;
  PageSize?: number;
}

export interface DocumentsParams {
  DocumentType?: DocumentType;
  SourceEntityType?: string;
  SourceEntityId?: string;
  UploadedFrom?: string;
  UploadedTo?: string;
  SearchTerm?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface DocumentVersionsParams {
  sourceEntityType?: string;
  sourceEntityId?: string;
  documentType?: DocumentType;
}

export interface WalletsParams {
  MinimumAvailableLoanAmount?: number;
  PageNumber?: number;
  PageSize?: number;
}

export interface InvoiceDashboardParams {
  InvoiceStatus?: InvoiceStatus;
  ShipperId?: string;
  Search?: string;
  DateFrom?: string;
  DateTo?: string;
  SortBy?: string;
  SortDescending?: boolean;
  PageNumber?: number;
  PageSize?: number;
}

export interface InvoicesParams {
  InvoiceStatus?: InvoiceStatus;
  ShipperId?: string;
  Search?: string;
  DateFrom?: string;
  DateTo?: string;
  SortBy?: string;
  SortDescending?: boolean;
  PageNumber?: number;
  PageSize?: number;
}

export interface FundWithdrawalsParams {
  OrganizationName?: string;
  WithdrawalType?: WithdrawalType;
  WithdrawalStatus?: WithdrawalStatus;
  OrganizationId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface FinancingRequestsParams {
  InvestorOrganizationId?: string;
  Status?: FinancingRequestStatus;
  PageNumber?: number;
  PageSize?: number;
}

export interface OrdersParams {
  Status?: OrderStatus;
  OrderId?: string;
  ShipperId?: string;
  RouteId?: string;
  UserId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface OrganizationsParams {
  SearchKey?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface InvestmentsParams {
  OrganizationId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface MobilizationsParams {
  OrganizationId?: string;
  MobilizationStatus?: MobilizationStatus;
  PageNumber?: number;
  PageSize?: number;
}

export interface TransactionsParams {
  OrganizationId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface ReconciliationsParams {
  ReconciliationStatus?: ReconciliationStatus;
  FinancingModel?: FinancingModel;
  InvestorOrganizationId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface SettlementsParams {
  SettlementStatus?: SettlementStatus;
  InvestorOrganizationId?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface DownloadReconciliationStatementParams {
  investorOrganizationId?: string;
  periodStart?: string;
  periodEnd?: string;
  format?: StatementFormat;
}

export interface PortfolioReportParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
  granularity?: PortfolioGranularity;
  format?: StatementFormat;
}

export interface CreditExposureReportParams {
  dimension?: string;
  format?: StatementFormat;
}

export interface CollectionsReportParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
  format?: StatementFormat;
}

export interface AuditReportParams {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
  entityType?: string;
  format?: StatementFormat;
}

export interface RoutesParams {
  SearchKey?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface BanksParams {
  Name?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface ShipmentsParams {
  ShipmentStatus?: ShipmentStatus;
  TruckNumber?: string;
  MobilizationStatus?: ShipmentMobilizationStatus;
  PageNumber?: number;
  PageSize?: number;
}

export interface ShippersParams {
  SearchKey?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface ShipperPriceListParams {
  PageNumber?: number;
  PageSize?: number;
}

export interface VendorsParams {
  SearchKey?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface VendorPriceListParams {
  PageNumber?: number;
  PageSize?: number;
}
