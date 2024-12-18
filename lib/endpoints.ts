import { forgotPassword } from "@/app/api/services";

export const API_ENDPOINTS = {
  routes: "routes",
  orders: "orders",
  shipment: "shipments",
  organization: "organizations",
  vendors: "vendors",
  shippers: "shippers",
  login: "users/login",
  forgotPassword: "users/forgot-password",
  refreshToken: "users/refreshToken",
  profile: "users/profile",
  investments: "organizations/investments",
  transactions: "organizations/transactions",
  mobilizations: "organizations/mobilizations",
  activate: "users/accept-invite",
  newmember: "users/add-to-organization",
  topup: "finances/top-up-loan",

  // Add more as needed
};
