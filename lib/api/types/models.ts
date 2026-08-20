import type {
  DeliveryStatus,
  DisbursementStatus,
  DisbursementType,
  DocumentType,
  FinalPaymentStatus,
  FinancingModel,
  FinancingRequestStatus,
  InvestmentStatus,
  InvoiceStatus,
  MeasurementUnit,
  MobilizationStatus,
  OrderStatus,
  OrganizationType,
  PaymentMethod,
  ReconciliationStatus,
  SettlementStatus,
  ShipmentMobilizationStatus,
  ShipmentStatus,
  TransactionType,
  UserRole,
  UserType,
  WaybillStatus,
  WithdrawalStatus,
  WithdrawalType,
} from "./enums";

/**
 * DTO interfaces generated from OpenAPI component schemas.
 * `metaData` is untyped in the spec, so it is `unknown`.
 */

export type ApiMetaData = unknown;

export interface AcceptInviteCommand {
  email: string | null;
  token: string | null;
  newPassword: string | null;
}

export interface AddOrganizationCommand {
  organizationName: string | null;
  agreedInterestRate?: number;
  referringOrganizationId?: string | null;
  organizationType?: OrganizationType;
  initialAdmin: InitialAdminPayload;
  organizationBankDetail: OrganizationBankDetailPayload;
}

export interface AddUserToOrganizationCommand {
  organizationId?: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  gender?: string | null;
  position?: string | null;
  userType?: UserType;
  userRole?: UserRole;
}

export interface AdminSummaryModel {
  totalInvestors?: string | null;
  totalShipments?: string | null;
  pendingFundWithdrawals?: string | null;
  loanAmountInUse?: string | null;
  loanAmountAvailable?: string | null;
  totalActiveInvestors?: number;
  activeCarriers?: number;
  shippersWithShipmentsThisMonth?: number;
  activeInvoices?: number;
  paidInvoicesThisMonth?: number;
  approvedPaymentRequests?: number;
  rejectedPaymentRequests?: number;
  totalCollected?: number;
  thhRevenue?: number;
  investorRevenue?: number;
  investorExposure?: InvestorExposureSummaryModel[] | null;
}

export interface AdminSummaryModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: AdminSummaryModel;
  metaData?: unknown | null;
}

export interface AvailableLoanWalletsCommand {
  neededAmount?: number;
}

export interface BankModel {
  name: string | null;
  code: string | null;
}

export interface BankModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: BankModel[] | null;
  metaData?: unknown | null;
}

export interface CarrierAnalyticsModel {
  vendorId?: string;
  vendorName?: string | null;
  shipmentCount?: number;
  deliveredCount?: number;
  deliverySuccessRate?: number;
  totalVendorValue?: number;
  totalFunded?: number;
  fundingUtilization?: number;
  averageRepaymentCycleDays?: number | null;
}

export interface CarrierAnalyticsModelListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: CarrierAnalyticsModel[] | null;
  metaData?: unknown | null;
}

export interface ChangePasswordCommand {
  currentPassword: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
}

export interface CollectionDashboardModel {
  totalInvoiced?: number;
  totalCollected?: number;
  outstandingBalance?: number;
  overdueBalance?: number;
  collectionRate?: number;
  averageCollectionPeriodDays?: number;
}

export interface CollectionDashboardModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: CollectionDashboardModel;
  metaData?: unknown | null;
}

export interface CollectionListItemModel {
  id?: string;
  invoiceNumber: string | null;
  shipperName: string | null;
  invoiceValue?: number;
  amountPaid?: number;
  outstandingBalance?: number;
  invoiceDate?: string;
  submittedAt?: string | null;
  dueDate?: string | null;
  invoiceStatus?: InvoiceStatus;
  isOverdue?: boolean;
  daysOutstanding?: number;
}

export interface CollectionListItemModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: CollectionListItemModel[] | null;
  metaData?: unknown | null;
}

export interface ConfirmDeliveryCommand {
  shipmentId?: string;
  notes?: string | null;
  proofOfDeliveryDocumentId?: string | null;
}

export interface ConfirmOffloadingCommand {
  shipmentId?: string;
  notes?: string | null;
  proofOfDeliveryDocumentId?: string | null;
}

export interface CreateOrderCommand {
  numberOfTrucks?: number;
  shipperId?: string;
  routeId?: string;
  operationOfficerId?: string | null;
}

export interface CreateRouteCommand {
  origin: string | null;
  destination: string | null;
}

export interface CreateRoutesCommand {
  routes?: RoutePayload[] | null;
}

export interface CreateShipperCommand {
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface CreateShipperPricesCommand {
  shipperId?: string;
  truckSizeId?: string;
  shipperPrices?: ShipperPricePayload[] | null;
}

export interface CreateShippersCommand {
  shippers?: ShipperPayload[] | null;
}

export interface CreateVendorCommand {
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
  vendorBankDetail: VendorBankDetailPayload;
}

export interface CreateVendorPricesCommand {
  vendorId?: string;
  truckSizeId?: string;
  vendorPrices?: VendorPricePayload[] | null;
}

export interface CreateVendorsCommand {
  vendors?: VendorPayload[] | null;
}

export interface CreateWaybillConfirmationCommand {
  shipmentId?: string;
  waybillNumber: string | null;
  shipperShipmentNumber?: string | null;
  salesOrderNumber?: string | null;
  notes?: string | null;
}

export interface DeleteShipperPriceCommand {
  shipperPriceId?: string;
}

export interface DeleteVendorPriceCommand {
  vendorPriceId?: string;
}

export interface DeliveryConfirmationModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  shipmentId?: string;
  shipmentNumber?: string | null;
  deliveryStatus?: DeliveryStatus;
  proofOfDeliveryDocumentId?: string | null;
  offloadedAt?: string | null;
  deliveredAt?: string | null;
  confirmedBy?: string | null;
  confirmedAt?: string | null;
  notes?: string | null;
}

export interface DeliveryConfirmationModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: DeliveryConfirmationModel;
  metaData?: unknown | null;
}

export interface DisbursementModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  idempotencyKey: string | null;
  correlationId: string | null;
  type?: DisbursementType;
  sourceId?: string;
  beneficiaryOrganizationId?: string | null;
  beneficiaryAccountNumber: string | null;
  beneficiaryName: string | null;
  bankCode: string | null;
  amount?: number;
  status?: DisbursementStatus;
  bankReference?: string | null;
  attemptCount?: number;
  nextRetryAt?: string | null;
  submittedAt?: string | null;
  completedAt?: string | null;
  failureReason?: string | null;
  slaAlerted?: boolean;
}

export interface DisbursementModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: DisbursementModel;
  metaData?: unknown | null;
}

export interface DisbursementModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: DisbursementModel[] | null;
  metaData?: unknown | null;
}

export interface DisputeSettlementCommand {
  settlementId?: string;
  reason: string | null;
}

export interface DocumentModel {
  id?: string;
  documentType?: DocumentType;
  fileName: string | null;
  contentType: string | null;
  fileSizeBytes?: number;
  sourceEntityType?: string | null;
  sourceEntityId?: string | null;
  version?: number;
  previousVersionId?: string | null;
  uploadedBy: string | null;
  uploadedAt?: string;
  fileHash: string | null;
}

export interface DocumentModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: DocumentModel;
  metaData?: unknown | null;
}

export interface DocumentModelListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: DocumentModel[] | null;
  metaData?: unknown | null;
}

export interface DocumentModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: DocumentModel[] | null;
  metaData?: unknown | null;
}

export interface DownloadDocumentsZipCommand {
  documentIds: string[] | null;
}

export interface FinalPaymentRequestModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  shipmentId?: string;
  shipmentNumber?: string | null;
  financingRequestId?: string | null;
  financingRequestNumber?: string | null;
  vendorId?: string;
  vendorName?: string | null;
  amount?: number;
  finalPaymentStatus?: FinalPaymentStatus;
  approvedBy?: string | null;
  approvedAt?: string | null;
  paidAt?: string | null;
  bankReference?: string | null;
  rejectionReason?: string | null;
}

export interface FinalPaymentRequestModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: FinalPaymentRequestModel;
  metaData?: unknown | null;
}

export interface FinalPaymentRequestModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: FinalPaymentRequestModel[] | null;
  metaData?: unknown | null;
}

export interface FinancingConfigurationModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  organizationId?: string;
  effectiveFrom?: string;
  model?: FinancingModel;
  interestRate?: number;
  profitSharePercent?: number | null;
  maxFundingPercent?: number;
  fundingLimit?: number;
  exposureLimit?: number;
  isActive?: boolean;
}

export interface FinancingConfigurationModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: FinancingConfigurationModel;
  metaData?: unknown | null;
}

export interface FinancingRequestModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  requestNumber: string | null;
  waybillId?: string;
  waybillNumber?: string | null;
  shipmentId?: string;
  shipmentNumber?: string | null;
  investorOrganizationId?: string;
  investorOrganizationName?: string | null;
  fundingPercent?: number;
  amount?: number;
  status?: FinancingRequestStatus;
  rejectionReason?: string | null;
  approvedBy?: string | null;
  approvedAt?: string | null;
  submittedAt?: string;
  appliedFinancingModel?: FinancingModel;
  appliedRateOrSharePercent?: number;
}

export interface FinancingRequestModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: FinancingRequestModel;
  metaData?: unknown | null;
}

export interface FinancingRequestModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: FinancingRequestModel[] | null;
  metaData?: unknown | null;
}

export interface ForgotPasswordCommand {
  email: string | null;
}

export interface FulfillOrderCommand {
  orderId?: string;
  shipmentPayloads?: ShipmentPayload[] | null;
}

export interface FundWithdrawalModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  withdrawalType?: WithdrawalType;
  amount?: number;
  narration?: string | null;
  withdrawalDate?: string;
  withdrawalStatus?: WithdrawalStatus;
  organizationId?: string;
  organization?: OrganizationMiniModel;
}

export interface FundWithdrawalModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: FundWithdrawalModel[] | null;
  metaData?: unknown | null;
}

export interface FundedRepaidPointModel {
  year?: number;
  month?: number;
  totalFunded?: number;
  totalRepaid?: number;
}

export interface GenerateInvoiceCommand {
  shipperId?: string;
}

export interface GenerateInvoiceFromSelectionCommand {
  shipperId?: string;
  shipmentIds?: string[] | null;
}

export interface GenerateSettlementCommand {
  investorOrganizationId?: string;
  periodStart?: string;
  periodEnd?: string;
}

export interface GuidBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: string;
  metaData?: unknown | null;
}

export interface InitialAdminPayload {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface InvestmentModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  investedAmount?: number;
  investmentDate?: string;
  roi?: number;
  maturityValue?: number;
  maturityDate?: string | null;
  investmentStatus?: InvestmentStatus;
  mobilization?: MobilizationModel;
  organization?: OrganizationModel;
}

export interface InvestmentModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: InvestmentModel[] | null;
  metaData?: unknown | null;
}

export interface InvestorCardSummaryModel {
  organizationId?: string;
  organizationName?: string | null;
  availableLoanAmount?: number;
  currentExposure?: number;
  interestEarned?: number;
  fundingUtilizationPercent?: number;
  activeShipmentCount?: number;
  exposureLimit?: number | null;
  fundingLimit?: number | null;
}

export interface InvestorCardSummaryModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: InvestorCardSummaryModel;
  metaData?: unknown | null;
}

export interface InvestorExposureSummaryModel {
  investorOrganizationId?: string;
  investorOrganizationName?: string | null;
  outstandingExposure?: number;
  totalFinanced?: number;
}

export interface InvoiceDashboardModel {
  totalActive?: number;
  submitted?: number;
  due?: number;
  overdue?: number;
  paidThisMonth?: number;
  totalInvoiceValue?: number;
  totalAmountFinanced?: number;
}

export interface InvoiceDashboardModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: InvoiceDashboardModel;
  metaData?: unknown | null;
}

export interface InvoiceItemModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  shipmentId?: string;
  shipment?: ShipmentMiniModel;
}

export interface InvoiceMiniModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  invoiceNumber: string | null;
  invoiceDate?: string;
  invoiceStatus?: InvoiceStatus;
  shipper?: ShipperMiniModel;
}

export interface InvoiceMiniModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: InvoiceMiniModel[] | null;
  metaData?: unknown | null;
}

export interface InvoiceModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  invoiceNumber: string | null;
  invoiceDate?: string;
  invoiceStatus?: InvoiceStatus;
  invoiceItems?: InvoiceItemModel[] | null;
  shipper?: ShipperMiniModel;
}

export interface InvoiceModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: InvoiceModel;
  metaData?: unknown | null;
}

export interface InvoicePaidCommand {
  invoiceId?: string;
}

export interface LoginCommand {
  email: string | null;
  password: string | null;
}

export interface LoginModel {
  accessToken: string | null;
  refreshToken: string | null;
  roles?: string[] | null;
  userType?: UserType;
  expiry?: string;
}

export interface LoginModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: LoginModel;
  metaData?: unknown | null;
}

export interface MobilizationMiniModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  beneficiaryAccountNumber: string | null;
  beneficiaryName: string | null;
  bankName: string | null;
  bankCode: string | null;
  amount?: number;
  mobilizationStatus?: MobilizationStatus;
  organizationId?: string;
}

export interface MobilizationModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  beneficiaryAccountNumber: string | null;
  beneficiaryName: string | null;
  bankName: string | null;
  bankCode: string | null;
  amount?: number;
  mobilizationStatus?: MobilizationStatus;
  shipment?: ShipmentModel;
  organizationId?: string;
  organization?: OrganizationModel;
  investment?: InvestmentModel;
}

export interface MobilizationModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: MobilizationModel[] | null;
  metaData?: unknown | null;
}

export interface MobilizeShipmentCommand {
  shipmentId?: string;
  percentToMobilize?: number;
  organizationId?: string;
}

export interface OrderModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  numberOfTrucks?: number;
  orderStatus?: OrderStatus;
  user?: UserModel;
  shipper?: ShipperMiniModel;
  route?: RouteMiniModel;
}

export interface OrderModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: OrderModel[] | null;
  metaData?: unknown | null;
}

export interface OrganizationBankDetailModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  bankCode: string | null;
}

export interface OrganizationBankDetailPayload {
  accountName: string | null;
  accountNumber: string | null;
  bankCode: string | null;
}

export interface OrganizationMiniModel {
  id?: string;
  organizationName: string | null;
}

export interface OrganizationModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  organizationName: string | null;
  agreedInterestRate?: number;
  wallet?: WalletModel;
  organizationBankDetail?: OrganizationBankDetailModel;
  members?: UserModel[] | null;
  referredOrganizations?: OrganizationModel[] | null;
}

export interface OrganizationModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: OrganizationModel;
  metaData?: unknown | null;
}

export interface OrganizationModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: OrganizationModel[] | null;
  metaData?: unknown | null;
}

export interface PaymentCycleBucketsModel {
  under25Days?: number;
  between25And35Days?: number;
  over35Days?: number;
  totalPaidInvoices?: number;
}

export interface PaymentCycleBucketsModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: PaymentCycleBucketsModel;
  metaData?: unknown | null;
}

export interface PaymentModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  invoiceId?: string;
  amount?: number;
  paymentDate?: string;
  paymentReference: string | null;
  paymentMethod?: PaymentMethod;
  evidenceDocumentId?: string | null;
  recordedBy: string | null;
  recordedAt?: string;
  receipt?: ReceiptModel;
}

export interface PaymentModelListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: PaymentModel[] | null;
  metaData?: unknown | null;
}

export interface ProductAnalyticsModel {
  productTypeId?: string;
  productTypeName?: string | null;
  shipmentCount?: number;
  totalShipperValue?: number;
  totalFunded?: number;
  averagePaymentCycleDays?: number | null;
  totalRecovered?: number;
  totalReconciledFinanced?: number;
  recoveryRate?: number;
}

export interface ProductAnalyticsModelListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ProductAnalyticsModel[] | null;
  metaData?: unknown | null;
}

export interface ProductTypeMiniModel {
  id?: string;
  name: string | null;
}

export interface ProductTypeMiniModelIEnumerableBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ProductTypeMiniModel[] | null;
  metaData?: unknown | null;
}

export interface ReceiptModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  paymentId?: string;
  receiptNumber: string | null;
  amount?: number;
  issuedAt?: string;
}

export interface ReconciliationDashboardModel {
  totalFinanced?: number;
  totalInvoiced?: number;
  totalCollected?: number;
  outstandingExposure?: number;
  thhRevenue?: number;
  investorRevenue?: number;
  defaultRate?: number;
  recoveryRate?: number;
  pendingSettlements?: number;
  settledAmount?: number;
  disputedAmount?: number;
}

export interface ReconciliationDashboardModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ReconciliationDashboardModel;
  metaData?: unknown | null;
}

export interface ReconciliationModel {
  id?: string;
  shipmentId?: string;
  shipmentNumber: string | null;
  invoiceId?: string | null;
  invoiceNumber?: string | null;
  financingRequestId?: string | null;
  financingRequestNumber?: string | null;
  investorOrganizationId?: string | null;
  investorOrganizationName?: string | null;
  financingModel?: FinancingModel;
  amountFinanced?: number;
  amountRecovered?: number;
  investorReturn?: number;
  thhRevenue?: number;
  settlementObligation?: number;
  reconciliationStatus?: ReconciliationStatus;
  computedAt?: string;
}

export interface ReconciliationModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ReconciliationModel;
  metaData?: unknown | null;
}

export interface ReconciliationModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ReconciliationModel[] | null;
  metaData?: unknown | null;
}

export interface RecordPaymentCommand {
  invoiceId?: string;
  amount?: number;
  paymentDate?: string;
  paymentReference: string | null;
  paymentMethod?: PaymentMethod;
  evidenceDocumentId?: string | null;
}

export interface RecordPaymentResultModel {
  paymentId?: string;
  receiptNumber: string | null;
  invoiceStatus?: InvoiceStatus;
  amountPaid?: number;
  outstandingBalance?: number;
}

export interface RecordPaymentResultModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: RecordPaymentResultModel;
  metaData?: unknown | null;
}

export interface RefreshInvoiceCommand {
  invoiceId?: string;
}

export interface RefreshTokenCommand {
  expiredToken: string | null;
  refreshToken: string | null;
}

export interface RejectFinalPaymentCommand {
  finalPaymentRequestId?: string;
  rejectionReason: string | null;
}

export interface RejectFinancingRequestCommand {
  financingRequestId?: string;
  reason?: string | null;
}

export interface RequestFinalPaymentCommand {
  shipmentId?: string;
}

export interface ResetPasswordCommand {
  email: string | null;
  newPassword: string | null;
  token: string | null;
}

export interface ReverseDisbursementCommand {
  disbursementId?: string;
  reason: string | null;
}

export interface RouteAnalyticsModel {
  routeId?: string;
  origin: string | null;
  destination: string | null;
  shipmentCount?: number;
  totalFunded?: number;
  grossMargin?: number;
  thhRevenue?: number;
  totalOverdueDays?: number;
  defaultCount?: number;
  concentration?: number;
  riskScore?: number;
}

export interface RouteAnalyticsModelListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: RouteAnalyticsModel[] | null;
  metaData?: unknown | null;
}

export interface RouteMiniModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  origin: string | null;
  destination: string | null;
}

export interface RouteMiniModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: RouteMiniModel;
  metaData?: unknown | null;
}

export interface RouteMiniModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: RouteMiniModel[] | null;
  metaData?: unknown | null;
}

export interface RoutePayload {
  origin: string | null;
  destination: string | null;
}

export interface SettlementModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  investorOrganizationId?: string;
  investorOrganizationName?: string | null;
  periodStart?: string;
  periodEnd?: string;
  totalPrincipal?: number;
  totalInvestorReturn?: number;
  totalVat?: number;
  totalWht?: number;
  netSettlementAmount?: number;
  settlementStatus?: SettlementStatus;
  settledAt?: string | null;
  settledBy?: string | null;
  disputeReason?: string | null;
}

export interface SettlementModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: SettlementModel;
  metaData?: unknown | null;
}

export interface SettlementModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: SettlementModel[] | null;
  metaData?: unknown | null;
}

export interface ShipmentMiniModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  shipmentNumber: string | null;
  origin: string | null;
  destination: string | null;
  vendorId?: string;
  vendor?: VendorMiniModel;
  shipper?: ShipperMiniModel;
  shipperPrice?: number;
  vendorPrice?: number;
  percentMobilized?: number;
  percentRemainingToMobilize?: number;
  shipmentDate?: string;
  shipmentStatus?: ShipmentStatus;
  mobilizationStatus?: ShipmentMobilizationStatus;
  driverName?: string | null;
  driverPhone?: string | null;
  truckNumber?: string | null;
  mobilizations?: MobilizationMiniModel[] | null;
}

export interface ShipmentModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  shipmentNumber: string | null;
  origin: string | null;
  destination: string | null;
  vendorId?: string;
  vendor?: VendorMiniModel;
  shipper?: ShipperMiniModel;
  productType?: ProductTypeMiniModel;
  shipperPrice?: number;
  vendorPrice?: number;
  percentMobilized?: number;
  percentRemainingToMobilize?: number;
  shipmentDate?: string;
  shipmentStatus?: ShipmentStatus;
  mobilizationStatus?: ShipmentMobilizationStatus;
  driverName?: string | null;
  driverPhone?: string | null;
  truckNumber?: string | null;
  mobilizations?: MobilizationModel[] | null;
  invoiceItem?: InvoiceItemModel;
}

export interface ShipmentModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ShipmentModel;
  metaData?: unknown | null;
}

export interface ShipmentModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ShipmentModel[] | null;
  metaData?: unknown | null;
}

export interface ShipmentPayload {
  vendorId?: string;
  productTypeId?: string;
  driverName?: string | null;
  driverPhone?: string | null;
  truckNumber?: string | null;
}

export interface ShipperAnalyticsModel {
  shipperId?: string;
  shipperName?: string | null;
  invoiceCount?: number;
  totalFunded?: number;
  totalRepaid?: number;
  outstandingBalance?: number;
  averagePaymentCycleDays?: number | null;
  averageDaysOutstanding?: number | null;
  series?: FundedRepaidPointModel[] | null;
}

export interface ShipperAnalyticsModelListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ShipperAnalyticsModel[] | null;
  metaData?: unknown | null;
}

export interface ShipperMiniModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface ShipperMiniModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ShipperMiniModel;
  metaData?: unknown | null;
}

export interface ShipperMiniModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ShipperMiniModel[] | null;
  metaData?: unknown | null;
}

export interface ShipperPayload {
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface ShipperPriceModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  price?: number;
  route?: RouteMiniModel;
  truckSize?: TruckSizeMiniModel;
  shipper?: ShipperMiniModel;
}

export interface ShipperPriceModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ShipperPriceModel;
  metaData?: unknown | null;
}

export interface ShipperPriceModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: ShipperPriceModel[] | null;
  metaData?: unknown | null;
}

export interface ShipperPricePayload {
  routeId?: string;
  price?: number;
}

export interface StringBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: string | null;
  metaData?: unknown | null;
}

export interface SubmitFinancingRequestCommand {
  waybillId?: string;
  investorOrganizationId?: string;
  fundingPercent?: number;
}

export interface TopUpLoanCommand {
  organizationId?: string;
  amount?: number;
  reason?: string | null;
}

export interface TransactionModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  transactionReference: string | null;
  narration: string | null;
  transactionType?: TransactionType;
  balanceBeforeTransaction?: number;
  amount?: number;
  balanceAfterTransaction?: number;
  transactionDate?: string;
  organizationId?: string;
}

export interface TransactionModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: TransactionModel[] | null;
  metaData?: unknown | null;
}

export interface TruckSizeMiniModel {
  id?: string;
  size?: number;
  measurementUnit?: MeasurementUnit;
}

export interface TruckSizeMiniModelIEnumerableBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: TruckSizeMiniModel[] | null;
  metaData?: unknown | null;
}

export type Unit = Record<string, never>;

export interface UnitBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: Unit;
  metaData?: unknown | null;
}

export interface UpdateInvoiceCommand {
  invoiceId?: string;
  invoiceDate?: string | null;
  dueDate?: string | null;
  editReason?: string | null;
}

export interface UpdateOrderCommand {
  orderId?: string;
  orderStatus?: OrderStatus;
  userId?: string | null;
  shipperId?: string | null;
  routeId?: string | null;
}

export interface UpdateOrganizationCommand {
  organizationId?: string | null;
  agreedInterestRate?: number | null;
}

export interface UpdateProfileCommand {
  firstName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  position?: string | null;
  phoneNumber?: string | null;
}

export interface UpdateRouteCommand {
  id?: string;
  origin: string | null;
  destination: string | null;
}

export interface UpdateShipmentCommand {
  id?: string;
  shipmentStatus?: ShipmentStatus;
  driverName?: string | null;
  driverPhone?: string | null;
  truckNumber?: string | null;
}

export interface UpdateShipperCommand {
  id?: string;
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface UpdateShipperPriceCommand {
  shipperPriceId?: string;
  newPrice?: number;
}

export interface UpdateVendorCommand {
  id?: string;
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface UpdateVendorPriceCommand {
  vendorPriceId?: string;
  newPrice?: number;
}

export interface UpsertFinancingConfigurationCommand {
  organizationId?: string;
  effectiveFrom?: string;
  model?: FinancingModel;
  interestRate?: number;
  profitSharePercent?: number | null;
  maxFundingPercent?: number;
  fundingLimit?: number;
  exposureLimit?: number;
  isActive?: boolean;
}

export interface UserModel {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  gender?: string | null;
  position?: string | null;
  phoneNumber?: string | null;
  userType?: UserType;
  organizationId?: string;
}

export interface UserModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: UserModel;
  metaData?: unknown | null;
}

export interface VendorBankDetailModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  bankCode: string | null;
}

export interface VendorBankDetailPayload {
  accountName: string | null;
  accountNumber: string | null;
  bankCode: string | null;
}

export interface VendorMiniModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
  vendorBankDetail?: VendorBankDetailModel;
}

export interface VendorMiniModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: VendorMiniModel;
  metaData?: unknown | null;
}

export interface VendorMiniModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: VendorMiniModel[] | null;
  metaData?: unknown | null;
}

export interface VendorPayload {
  name: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface VendorPriceModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  price?: number;
  route?: RouteMiniModel;
  truckSize?: TruckSizeMiniModel;
  vendor?: VendorMiniModel;
}

export interface VendorPriceModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: VendorPriceModel;
  metaData?: unknown | null;
}

export interface VendorPriceModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: VendorPriceModel[] | null;
  metaData?: unknown | null;
}

export interface VendorPricePayload {
  routeId?: string;
  price?: number;
}

export interface WalletModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  availableLoanAmount?: number;
  loanAmountInUse?: number;
  interestEarned?: number;
  organization?: OrganizationMiniModel;
}

export interface WalletModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: WalletModel;
  metaData?: unknown | null;
}

export interface WalletModelIEnumerableBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: WalletModel[] | null;
  metaData?: unknown | null;
}

export interface WalletModelPagedListBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: WalletModel[] | null;
  metaData?: unknown | null;
}

export interface WaybillConfirmationSummaryModel {
  waybillNumber: string | null;
  shipperShipmentNumber?: string | null;
  salesOrderNumber?: string | null;
  origin: string | null;
  destination: string | null;
  shipperName?: string | null;
  productTypeName?: string | null;
  truckNumber?: string | null;
  driverName?: string | null;
  expiresAt?: string;
}

export interface WaybillConfirmationSummaryModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: WaybillConfirmationSummaryModel;
  metaData?: unknown | null;
}

export interface WaybillModel {
  id?: string;
  createdAt?: string;
  createdBy: string | null;
  modifiedAt?: string;
  modifiedBy?: string | null;
  shipmentId?: string;
  waybillNumber: string | null;
  shipperShipmentNumber?: string | null;
  salesOrderNumber?: string | null;
  notes?: string | null;
  status?: WaybillStatus;
  waybillDocumentId?: string | null;
}

export interface WaybillModelBaseResponse {
  isSuccess?: boolean;
  responseCode?: string | null;
  responseMessage?: string | null;
  responseData?: WaybillModel;
  metaData?: unknown | null;
}

export interface WithdrawalCommand {
  withdrawalType?: WithdrawalType;
  amount?: number;
  narration?: string | null;
}

/** Multipart body for `POST /documents` (not a named schema in Swagger). */
export interface UploadDocumentBody {
  file: Blob;
  documentType?: DocumentType;
  sourceEntityType?: string;
  sourceEntityId?: string;
}
