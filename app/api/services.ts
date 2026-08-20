import { failedEnvelope, getApiErrorMessage, isApiError } from "@/lib/api/errors";
import {
  acceptInvite,
  forgotPassword as requestForgotPassword,
  login,
  resetPassword as requestResetPassword,
} from "@/lib/api/services/auth.service";
import { getAdminSummary } from "@/lib/api/services/dashboard.service";
import {
  createFundWithdrawal,
  generateInvoice as requestGenerateInvoice,
  getAvailableLoanWallets,
  getFundWithdrawals,
  getInvoice,
  getInvoices as fetchInvoices,
  markInvoicePaid,
  topUpLoan,
} from "@/lib/api/services/finances.service";
import {
  createOrder as requestCreateOrder,
  fulfillOrder as requestFulfillOrder,
  getOrders,
  updateOrder as requestUpdateOrder,
} from "@/lib/api/services/orders.service";
import {
  createOrganization,
  deleteOrganization as requestDeleteOrganization,
  getInvestments,
  getMobilizations,
  getOrganization,
  getOrganizationWallet,
  getTransactions,
  updateOrganization as requestUpdateOrganization,
} from "@/lib/api/services/organizations.service";
import {
  createRoute,
  deleteRoute as requestDeleteRoute,
  getRoutes,
  updateRoute as requestUpdateRoute,
} from "@/lib/api/services/routes.service";
import {
  getBanks,
  getProductTypes as fetchProductTypes,
  getTruckSizes as fetchTruckSizes,
} from "@/lib/api/services/shared.service";
import {
  getShipments,
  mobilizeShipment as requestMobilizeShipment,
} from "@/lib/api/services/shipments.service";
import {
  createShipper,
  createShipperPrices,
  deleteShipper as requestDeleteShipper,
  deleteShipperPrice,
  getShipperPriceList,
  getShippers,
  updateShipper as requestUpdateShipper,
  updateShipperPrice,
} from "@/lib/api/services/shippers.service";
import {
  addUserToOrganization,
  updateProfile as requestUpdateProfile,
} from "@/lib/api/services/users.service";
import {
  createVendor,
  createVendorPrices,
  deleteVendor as requestDeleteVendor,
  deleteVendorPrice,
  getVendorPriceList,
  getVendors,
  updateVendor as requestUpdateVendor,
  updateVendorPrice,
} from "@/lib/api/services/vendors.service";
import type {
  AcceptInviteCommand,
  AddOrganizationCommand,
  AddUserToOrganizationCommand,
  AvailableLoanWalletsCommand,
  CreateOrderCommand,
  CreateRouteCommand,
  CreateShipperCommand,
  CreateShipperPricesCommand,
  CreateVendorCommand,
  CreateVendorPricesCommand,
  ForgotPasswordCommand,
  FulfillOrderCommand,
  GenerateInvoiceCommand,
  InvoicePaidCommand,
  LoginCommand,
  LoginModelBaseResponse,
  MobilizeShipmentCommand,
  ResetPasswordCommand,
  TopUpLoanCommand,
  UpdateOrderCommand,
  UpdateOrganizationCommand,
  UpdateProfileCommand,
  UpdateRouteCommand,
  UpdateShipperCommand,
  UpdateShipperPriceCommand,
  UpdateVendorCommand,
  WithdrawalCommand,
} from "@/lib/api/types/models";

function unwrapList<T>(response: { responseData?: T[] | null }): T[] {
  return response.responseData ?? [];
}

function organizationScope(organizationId = "") {
  return organizationId ? { OrganizationId: organizationId } : undefined;
}

function loginFailure(error: unknown): LoginModelBaseResponse {
  if (isApiError(error) && error.body && typeof error.body === "object") {
    const body = error.body as LoginModelBaseResponse;
    return {
      isSuccess: false,
      responseCode: body.responseCode,
      responseMessage: body.responseMessage ?? error.responseMessage,
      responseData: body.responseData,
      metaData: body.metaData,
    };
  }
  return {
    isSuccess: false,
    responseMessage: getApiErrorMessage(error),
  };
}

/* Queries — zero-arg so they are safe as React Query `queryFn` values. */

export const getAllRoutes = () => getRoutes();
export const getAllOrders = () => getOrders();
export const getAllShipments = () => getShipments();
export const getAllInvestment = () => getInvestments();
export const getAllPrice = () => getShipperPriceList();
export const getAllVPrice = () => getVendorPriceList();
export const getAllBanks = async () => unwrapList(await getBanks());
export const getAllVendors = async () => unwrapList(await getVendors());
export const getProductTypes = async () => unwrapList(await fetchProductTypes());
export const getTruckSizes = async () => unwrapList(await fetchTruckSizes());
export const getAllShippers = async () => unwrapList(await getShippers());
export const getInvoices = async () => unwrapList(await fetchInvoices());
export const getAllWithdrawals = async () => unwrapList(await getFundWithdrawals());
export const dashboard = async () => (await getAdminSummary()).responseData;

export const getOrganizationId = async (id = "") =>
  (await getOrganization(id)).responseData;
export const getAllMobilizations = (organizationId = "") =>
  getMobilizations(organizationScope(organizationId));
export const getAllInvestments = (organizationId = "") =>
  getInvestments(organizationScope(organizationId));
export const getAllTransactions = (organizationId = "") =>
  getTransactions(organizationScope(organizationId));
export const generateInvoiceId = async (id: string) =>
  (await getInvoice(id)).responseData;
export const getWallet = async (organizationId: string) =>
  (await getOrganizationWallet(organizationId)).responseData;

/* Mutations — aliases plus the few argument-shape adapters. */

export const addNewRoute = (data: CreateRouteCommand) => createRoute(data);
export const addNewShipper = (data: CreateShipperCommand) => createShipper(data);
export const addNewOrganization = (data: AddOrganizationCommand) =>
  createOrganization(data);
export const addNewVendor = (data: CreateVendorCommand) => createVendor(data);
export const addNewMember = (data: AddUserToOrganizationCommand) =>
  addUserToOrganization(data);
export const createPrice = (data: CreateShipperPricesCommand) =>
  createShipperPrices(data);
export const createVendorPrice = (data: CreateVendorPricesCommand) =>
  createVendorPrices(data);
export const createOrder = (data: CreateOrderCommand) => requestCreateOrder(data);
export const updateOrder = (data: UpdateOrderCommand) => requestUpdateOrder(data);
export const fulfillOrder = (data: FulfillOrderCommand) =>
  requestFulfillOrder(data);
export const generateInvoice = (data: GenerateInvoiceCommand) =>
  requestGenerateInvoice(data);
export const withdrawFunds = (data: WithdrawalCommand) =>
  createFundWithdrawal(data);
export const topupLoan = (data: TopUpLoanCommand) => topUpLoan(data);
export const updateProfile = (data: UpdateProfileCommand) =>
  requestUpdateProfile(data);
export const updateRoute = (data: UpdateRouteCommand) => requestUpdateRoute(data);
export const updateShipper = (data: UpdateShipperCommand) =>
  requestUpdateShipper(data);
export const updateVendor = (data: UpdateVendorCommand) =>
  requestUpdateVendor(data);
export const updatePrice = (data: UpdateShipperPriceCommand) =>
  updateShipperPrice(data);
export const deleteRoute = (routeId: string) => requestDeleteRoute(routeId);
export const deleteShipper = (shipperId: string) =>
  requestDeleteShipper(shipperId);
export const deleteOrganization = (organizationId: string) =>
  requestDeleteOrganization(organizationId);
export const deleteVendor = (vendorId: string) => requestDeleteVendor(vendorId);

export const deletePrice = (shipperPriceId: string) =>
  deleteShipperPrice({ shipperPriceId });
export const deleteVPrice = (vendorPriceId: string) =>
  deleteVendorPrice({ vendorPriceId });
export const updateOrganization = (data: UpdateOrganizationCommand) =>
  requestUpdateOrganization(data.organizationId ?? "", data);
export const updateVPrice = (data: {
  vendorPriceId: string;
  newPrice: string | number;
}) =>
  updateVendorPrice({
    vendorPriceId: data.vendorPriceId,
    newPrice:
      typeof data.newPrice === "number" ? data.newPrice : Number(data.newPrice),
  });

export const availableLoanWallet = async (data: AvailableLoanWalletsCommand) =>
  (await getAvailableLoanWallets(data)).responseData;
export const mobilizeShipment = async (data: MobilizeShipmentCommand) =>
  (await requestMobilizeShipment(data)).responseData;
export const payInvoice = async (data: InvoicePaidCommand) =>
  (await markInvoicePaid(data)).responseData;

export async function signIn(credentials: LoginCommand) {
  try {
    return await login(credentials);
  } catch (error) {
    return loginFailure(error);
  }
}

export async function forgotPassword(credentials: ForgotPasswordCommand) {
  try {
    return await requestForgotPassword(credentials);
  } catch (error) {
    return failedEnvelope(error);
  }
}

export async function resetPassword(credentials: ResetPasswordCommand) {
  try {
    return await requestResetPassword(credentials);
  } catch (error) {
    return failedEnvelope(error);
  }
}

export async function activateAccount(credentials: AcceptInviteCommand) {
  try {
    return await acceptInvite(credentials);
  } catch (error) {
    return failedEnvelope(error);
  }
}
