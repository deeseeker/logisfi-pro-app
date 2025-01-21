import { forgotPassword, resetPassword } from "@/app/api/services";

export const API_ENDPOINTS = {
  routes: "routes",
  banks: "shared/banks",
  orders: "orders",
  shipment: "shipments",
  organization: "organizations",
  vendors: "vendors",
  shippers: "shippers",
  login: "users/login",
  forgotPassword: "users/forgot-password",
  resetPassword: "users/reset-password",
  refreshToken: "users/refreshToken",
  profile: "users/profile",
  investments: "organizations/investments",
  transactions: "organizations/transactions",
  mobilizations: "organizations/mobilizations",
  activate: "users/accept-invite",
  newmember: "users/add-to-organization",
  topup: "finances/top-up-loan",
  dashboard: "dashboard/admin-summary",
  invoice: "finances/invoices",

  // Add more as needed
};
