import type {
  AdminSummaryParams,
  AuditReportParams,
  BanksParams,
  CarrierAnalyticsParams,
  CollectionsParams,
  CollectionsReportParams,
  CreditExposureReportParams,
  DisbursementsParams,
  DocumentVersionsParams,
  DocumentsParams,
  DownloadReconciliationStatementParams,
  FinalPaymentsParams,
  FinancingRequestsParams,
  FundWithdrawalsParams,
  InvestmentsParams,
  InvoiceDashboardParams,
  InvoicesParams,
  MobilizationsParams,
  OrdersParams,
  OrganizationsParams,
  PaymentCycleBucketsParams,
  PortfolioReportParams,
  ProductAnalyticsParams,
  ReconciliationsParams,
  RouteAnalyticsParams,
  RoutesParams,
  SettlementsParams,
  ShipmentsParams,
  ShipperAnalyticsParams,
  ShipperPriceListParams,
  ShippersParams,
  TransactionsParams,
  VendorPriceListParams,
  VendorsParams,
  WalletsParams,
} from "./types/params";

/** Centralized TanStack Query keys. Always invalidate via these factories. */

export const analyticsKeys = {
  all: ["analytics"] as const,
  shipperAnalytics: (params?: ShipperAnalyticsParams) => [...analyticsKeys.all, "shipperAnalytics", params] as const,
  routeAnalytics: (params?: RouteAnalyticsParams) => [...analyticsKeys.all, "routeAnalytics", params] as const,
  productAnalytics: (params?: ProductAnalyticsParams) => [...analyticsKeys.all, "productAnalytics", params] as const,
  carrierAnalytics: (params?: CarrierAnalyticsParams) => [...analyticsKeys.all, "carrierAnalytics", params] as const,
  paymentCycleBuckets: (params?: PaymentCycleBucketsParams) => [...analyticsKeys.all, "paymentCycleBuckets", params] as const,
};

export const collectionsKeys = {
  all: ["collections"] as const,
  collections: (params?: CollectionsParams) => [...collectionsKeys.all, "collections", params] as const,
  collectionsDashboard: () => [...collectionsKeys.all, "collectionsDashboard"] as const,
  invoicePayments: (invoiceId: string) => [...collectionsKeys.all, "invoicePayments", invoiceId] as const,
};

export const confirmationKeys = {
  all: ["confirmations"] as const,
  confirmation: (token: string) => [...confirmationKeys.all, "confirmation", token] as const,
};

export const dashboardKeys = {
  all: ["dashboard"] as const,
  adminSummary: (params?: AdminSummaryParams) => [...dashboardKeys.all, "adminSummary", params] as const,
};

export const deliveriesKeys = {
  all: ["deliveries"] as const,
  delivery: (shipmentId: string) => [...deliveriesKeys.all, "delivery", shipmentId] as const,
  finalPayments: (params?: FinalPaymentsParams) => [...deliveriesKeys.all, "finalPayments", params] as const,
};

export const disbursementsKeys = {
  all: ["disbursements"] as const,
  disbursements: (params?: DisbursementsParams) => [...disbursementsKeys.all, "disbursements", params] as const,
  disbursement: (id: string) => [...disbursementsKeys.all, "disbursement", id] as const,
};

export const documentKeys = {
  all: ["documents"] as const,
  documents: (params?: DocumentsParams) => [...documentKeys.all, "documents", params] as const,
  downloadDocument: (documentId: string) => [...documentKeys.all, "downloadDocument", documentId] as const,
  documentVersions: (params?: DocumentVersionsParams) => [...documentKeys.all, "documentVersions", params] as const,
};

export const financesKeys = {
  all: ["finances"] as const,
  wallets: (params?: WalletsParams) => [...financesKeys.all, "wallets", params] as const,
  invoice: (id: string) => [...financesKeys.all, "invoice", id] as const,
  invoiceDashboard: (params?: InvoiceDashboardParams) => [...financesKeys.all, "invoiceDashboard", params] as const,
  downloadInvoicePdf: (id: string) => [...financesKeys.all, "downloadInvoicePdf", id] as const,
  invoices: (params?: InvoicesParams) => [...financesKeys.all, "invoices", params] as const,
  fundWithdrawals: (params?: FundWithdrawalsParams) => [...financesKeys.all, "fundWithdrawals", params] as const,
};

export const financingKeys = {
  all: ["financing"] as const,
  financingRequests: (params?: FinancingRequestsParams) => [...financingKeys.all, "financingRequests", params] as const,
  financingConfiguration: (orgId: string) => [...financingKeys.all, "financingConfiguration", orgId] as const,
  investorSummary: (orgId: string) => [...financingKeys.all, "investorSummary", orgId] as const,
};

export const orderKeys = {
  all: ["orders"] as const,
  orders: (params?: OrdersParams) => [...orderKeys.all, "orders", params] as const,
};

export const organizationKeys = {
  all: ["organization"] as const,
  organizations: (params?: OrganizationsParams) => [...organizationKeys.all, "list", params] as const,
  organization: (id: string) => [...organizationKeys.all, id] as const,
  investments: (params?: InvestmentsParams) => ["investments", params] as const,
  mobilizations: (params?: MobilizationsParams) => ["mobilizations", params] as const,
  transactions: (params?: TransactionsParams) => ["transactions", params] as const,
  organizationWallet: (organizationId: string) => ["wallet-details", organizationId] as const,
};

export const reconciliationKeys = {
  all: ["reconciliation"] as const,
  reconciliationDashboard: () => [...reconciliationKeys.all, "reconciliationDashboard"] as const,
  reconciliations: (params?: ReconciliationsParams) => [...reconciliationKeys.all, "reconciliations", params] as const,
  settlements: (params?: SettlementsParams) => [...reconciliationKeys.all, "settlements", params] as const,
  downloadReconciliationStatement: (params?: DownloadReconciliationStatementParams) => [...reconciliationKeys.all, "downloadReconciliationStatement", params] as const,
};

export const reportKeys = {
  all: ["reports"] as const,
  portfolioReport: (params?: PortfolioReportParams) => [...reportKeys.all, "portfolioReport", params] as const,
  creditExposureReport: (params?: CreditExposureReportParams) => [...reportKeys.all, "creditExposureReport", params] as const,
  collectionsReport: (params?: CollectionsReportParams) => [...reportKeys.all, "collectionsReport", params] as const,
  auditReport: (params?: AuditReportParams) => [...reportKeys.all, "auditReport", params] as const,
};

export const routeKeys = {
  all: ["routes"] as const,
  routes: (params?: RoutesParams) => [...routeKeys.all, "routes", params] as const,
};

export const sharedKeys = {
  all: ["shared"] as const,
  banks: (params?: BanksParams) => ["banks", params] as const,
  truckSizes: () => ["truck-size"] as const,
  productTypes: () => ["product-types"] as const,
};

export const shipmentKeys = {
  all: ["shipments"] as const,
  shipments: (params?: ShipmentsParams) => [...shipmentKeys.all, "shipments", params] as const,
  shipment: (shipmentId: string) => [...shipmentKeys.all, "shipment", shipmentId] as const,
};

export const shipperKeys = {
  all: ["shippers"] as const,
  shippers: (params?: ShippersParams) => [...shipperKeys.all, "shippers", params] as const,
  shipperPriceList: (params?: ShipperPriceListParams) => [...shipperKeys.all, "shipperPriceList", params] as const,
};

export const userKeys = {
  all: ["users"] as const,
  profile: () => ["profile"] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
};

export const vendorKeys = {
  all: ["vendors"] as const,
  vendors: (params?: VendorsParams) => [...vendorKeys.all, "vendors", params] as const,
  vendorPriceList: (params?: VendorPriceListParams) => [...vendorKeys.all, "vendorPriceList", params] as const,
};

export const waybillKeys = {
  all: ["waybills"] as const,
};

export const queryKeys = {
  analytics: analyticsKeys,
  collections: collectionsKeys,
  confirmation: confirmationKeys,
  dashboard: dashboardKeys,
  deliveries: deliveriesKeys,
  disbursements: disbursementsKeys,
  document: documentKeys,
  finances: financesKeys,
  financing: financingKeys,
  order: orderKeys,
  organization: organizationKeys,
  reconciliation: reconciliationKeys,
  report: reportKeys,
  route: routeKeys,
  shared: sharedKeys,
  shipment: shipmentKeys,
  shipper: shipperKeys,
  user: userKeys,
  vendor: vendorKeys,
  waybill: waybillKeys,
};
