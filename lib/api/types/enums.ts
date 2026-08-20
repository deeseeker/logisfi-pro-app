/**
 * String unions generated from OpenAPI `*Enums` schemas.
 * Const objects are provided for runtime iteration and exhaustive switches.
 */

export type DateRangePeriod = "CurrentYear" | "Custom" | "Last30Days" | "Last7Days" | "Last90Days";

export const DateRangePeriod = {
  CurrentYear: "CurrentYear",
  Custom: "Custom",
  Last30Days: "Last30Days",
  Last7Days: "Last7Days",
  Last90Days: "Last90Days",
} as const satisfies Record<string, DateRangePeriod>;

export type DeliveryStatus = "Confirmed" | "Delivered" | "InTransit" | "NotDelivered" | "Offloaded";

export const DeliveryStatus = {
  Confirmed: "Confirmed",
  Delivered: "Delivered",
  InTransit: "InTransit",
  NotDelivered: "NotDelivered",
  Offloaded: "Offloaded",
} as const satisfies Record<string, DeliveryStatus>;

export type DisbursementStatus = "Failed" | "Pending" | "Reversed" | "Submitted" | "Succeeded" | "Unknown";

export const DisbursementStatus = {
  Failed: "Failed",
  Pending: "Pending",
  Reversed: "Reversed",
  Submitted: "Submitted",
  Succeeded: "Succeeded",
  Unknown: "Unknown",
} as const satisfies Record<string, DisbursementStatus>;

export type DisbursementType = "FinalPayment" | "Mobilization" | "SettlementPayout";

export const DisbursementType = {
  FinalPayment: "FinalPayment",
  Mobilization: "Mobilization",
  SettlementPayout: "SettlementPayout",
} as const satisfies Record<string, DisbursementType>;

export type DocumentType = "FundingRequest" | "InvestorStatement" | "Invoice" | "Other" | "PaymentReceipt" | "ProofOfDelivery" | "ReconciliationReport" | "SettlementStatement" | "Waybill";

export const DocumentType = {
  FundingRequest: "FundingRequest",
  InvestorStatement: "InvestorStatement",
  Invoice: "Invoice",
  Other: "Other",
  PaymentReceipt: "PaymentReceipt",
  ProofOfDelivery: "ProofOfDelivery",
  ReconciliationReport: "ReconciliationReport",
  SettlementStatement: "SettlementStatement",
  Waybill: "Waybill",
} as const satisfies Record<string, DocumentType>;

export type FinalPaymentStatus = "Approved" | "Paid" | "Pending" | "Rejected";

export const FinalPaymentStatus = {
  Approved: "Approved",
  Paid: "Paid",
  Pending: "Pending",
  Rejected: "Rejected",
} as const satisfies Record<string, FinalPaymentStatus>;

export type FinancingModel = "InterestBased" | "ProfitSharing";

export const FinancingModel = {
  InterestBased: "InterestBased",
  ProfitSharing: "ProfitSharing",
} as const satisfies Record<string, FinancingModel>;

export type FinancingRequestStatus = "Approved" | "Disbursed" | "Failed" | "Pending" | "Rejected";

export const FinancingRequestStatus = {
  Approved: "Approved",
  Disbursed: "Disbursed",
  Failed: "Failed",
  Pending: "Pending",
  Rejected: "Rejected",
} as const satisfies Record<string, FinancingRequestStatus>;

export type InvestmentStatus = "Active" | "Matured";

export const InvestmentStatus = {
  Active: "Active",
  Matured: "Matured",
} as const satisfies Record<string, InvestmentStatus>;

export type InvoiceStatus = "Cancelled" | "Closed" | "Due" | "Overdue" | "Paid" | "PartiallyPaid" | "Pending" | "Submitted";

export const InvoiceStatus = {
  Cancelled: "Cancelled",
  Closed: "Closed",
  Due: "Due",
  Overdue: "Overdue",
  Paid: "Paid",
  PartiallyPaid: "PartiallyPaid",
  Pending: "Pending",
  Submitted: "Submitted",
} as const satisfies Record<string, InvoiceStatus>;

export type MeasurementUnit = "Centimeter" | "CubicMeter" | "FluidOunce" | "Gallon" | "Gram" | "Kilogram" | "Kilometer" | "Liter" | "Meter" | "MetricTon" | "Milligram" | "Milliliter" | "Ounce" | "Pint" | "Pound" | "Quart" | "Ton";

export const MeasurementUnit = {
  Centimeter: "Centimeter",
  CubicMeter: "CubicMeter",
  FluidOunce: "FluidOunce",
  Gallon: "Gallon",
  Gram: "Gram",
  Kilogram: "Kilogram",
  Kilometer: "Kilometer",
  Liter: "Liter",
  Meter: "Meter",
  MetricTon: "MetricTon",
  Milligram: "Milligram",
  Milliliter: "Milliliter",
  Ounce: "Ounce",
  Pint: "Pint",
  Pound: "Pound",
  Quart: "Quart",
  Ton: "Ton",
} as const satisfies Record<string, MeasurementUnit>;

export type MobilizationStatus = "Approved" | "Failed" | "Pending";

export const MobilizationStatus = {
  Approved: "Approved",
  Failed: "Failed",
  Pending: "Pending",
} as const satisfies Record<string, MobilizationStatus>;

export type OrderStatus = "Cancelled" | "CompletelyFulfilled" | "PartlyFulfilled" | "Pending";

export const OrderStatus = {
  Cancelled: "Cancelled",
  CompletelyFulfilled: "CompletelyFulfilled",
  PartlyFulfilled: "PartlyFulfilled",
  Pending: "Pending",
} as const satisfies Record<string, OrderStatus>;

export type OrganizationType = "Clearing" | "Investor";

export const OrganizationType = {
  Clearing: "Clearing",
  Investor: "Investor",
} as const satisfies Record<string, OrganizationType>;

export type PaymentMethod = "BankTransfer";

export const PaymentMethod = {
  BankTransfer: "BankTransfer",
} as const satisfies Record<string, PaymentMethod>;

export type PortfolioGranularity = "Daily" | "Monthly" | "Weekly";

export const PortfolioGranularity = {
  Daily: "Daily",
  Monthly: "Monthly",
  Weekly: "Weekly",
} as const satisfies Record<string, PortfolioGranularity>;

export type ReconciliationStatus = "Collected" | "Disputed" | "Financed" | "Invoiced" | "ReadyForSettlement" | "Settled";

export const ReconciliationStatus = {
  Collected: "Collected",
  Disputed: "Disputed",
  Financed: "Financed",
  Invoiced: "Invoiced",
  ReadyForSettlement: "ReadyForSettlement",
  Settled: "Settled",
} as const satisfies Record<string, ReconciliationStatus>;

export type SettlementStatus = "Disputed" | "Pending" | "Settled";

export const SettlementStatus = {
  Disputed: "Disputed",
  Pending: "Pending",
  Settled: "Settled",
} as const satisfies Record<string, SettlementStatus>;

export type ShipmentMobilizationStatus = "Invoiced" | "InvoicedAndPaid" | "Mobilized" | "NotMobilized" | "PartiallyMobilized";

export const ShipmentMobilizationStatus = {
  Invoiced: "Invoiced",
  InvoicedAndPaid: "InvoicedAndPaid",
  Mobilized: "Mobilized",
  NotMobilized: "NotMobilized",
  PartiallyMobilized: "PartiallyMobilized",
} as const satisfies Record<string, ShipmentMobilizationStatus>;

export type ShipmentStatus = "Cancelled" | "Delivered" | "InTransit" | "Paid" | "Pending";

export const ShipmentStatus = {
  Cancelled: "Cancelled",
  Delivered: "Delivered",
  InTransit: "InTransit",
  Paid: "Paid",
  Pending: "Pending",
} as const satisfies Record<string, ShipmentStatus>;

export type StatementFormat = "Csv" | "Excel" | "Pdf";

export const StatementFormat = {
  Csv: "Csv",
  Excel: "Excel",
  Pdf: "Pdf",
} as const satisfies Record<string, StatementFormat>;

export type TransactionType = "Credit" | "Debit";

export const TransactionType = {
  Credit: "Credit",
  Debit: "Debit",
} as const satisfies Record<string, TransactionType>;

export type UserRole = "Admin" | "Approver" | "Initiator" | "StaffAdmin" | "StaffMember";

export const UserRole = {
  Admin: "Admin",
  Approver: "Approver",
  Initiator: "Initiator",
  StaffAdmin: "StaffAdmin",
  StaffMember: "StaffMember",
} as const satisfies Record<string, UserRole>;

export type UserType = "AccountManager" | "Investor" | "PlatformBeneficiary" | "PlatformOwner";

export const UserType = {
  AccountManager: "AccountManager",
  Investor: "Investor",
  PlatformBeneficiary: "PlatformBeneficiary",
  PlatformOwner: "PlatformOwner",
} as const satisfies Record<string, UserType>;

export type WaybillStatus = "ConfirmationSent" | "Confirmed" | "Expired" | "Pending" | "Rejected";

export const WaybillStatus = {
  ConfirmationSent: "ConfirmationSent",
  Confirmed: "Confirmed",
  Expired: "Expired",
  Pending: "Pending",
  Rejected: "Rejected",
} as const satisfies Record<string, WaybillStatus>;

export type WithdrawalStatus = "Approved" | "Pending" | "Rejected";

export const WithdrawalStatus = {
  Approved: "Approved",
  Pending: "Pending",
  Rejected: "Rejected",
} as const satisfies Record<string, WithdrawalStatus>;

export type WithdrawalType = "Interest" | "LoanLiquidation";

export const WithdrawalType = {
  Interest: "Interest",
  LoanLiquidation: "LoanLiquidation",
} as const satisfies Record<string, WithdrawalType>;
