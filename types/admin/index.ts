import * as z from "zod";

export interface IRoutes {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  origin: string;
  destination: string;
}

export enum UserTypeEnum {
  Investor = 1,
  Clearing,
  AccountManager,
}

export enum RoleEnum {
  Initiator = 1,
  Approver,
  Admin,
}

export enum OrderStatusEnums {
  Pending = 1,
  PartlyFulfilled,
  CompletelyFulfilled,
  Cancelled,
}

export enum InvestmentStatusEnums {
  Active = 1,
  Matured,
}

export enum MobilizationStatusEnums {
  Pending = 1,
  Approved,
  Failed,
}
export enum ShipmentStatusEnums {
  Pending = 1,
  InTransit,
  Delivered,
  Cancelled,
}
//"pending approved failed  for shipment status "
export type Status =
  | "Pending"
  | "PartlyFulfilled"
  | "CompletelyFulfilled"
  | "Cancelled"
  | "1"
  | "2"
  | "3"
  | "4";
export interface IOrders {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  numberOfTrucks: number;
  orderStatus: string;
  user: IUser;
  shipper: IVendors;
  route: IRoutes;
}

export interface ILoad {
  shipmentNumber: string;
  vendor: IVendors;
  shipper: Shipper;
  shipperPrice: string;
  vendorPrice: string;
  shipmentDate: string;
  shipmentStatus: string;
  driverName: string;
  driverPhone: string;
  truckNumber: string;
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  position: string;
  phoneNumber: string;
  userType: string;
  organizationId: string;
}

export interface Shipper {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}

export interface IInvestments {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  investedAmount: number;
  investmentDate: string;
  roi: number;
  maturityValue: number;
  maturityDate: string;
  investmentStatus: string;
  mobilization: Mobilization;
  organization: Organization;
}

export type Mobilization = {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  beneficiaryAccountNumber: string;
  beneficiaryName: string;
  bankName: string;
  bankCode: string;
  amount: number;
  mobilizationStatus: string;
  shipment: Shipment;
  organization: Organization;
};

export type Shipment = {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  shipmentNumber: string;
  vendor: Vendor;
  shipper: Shipper;
  shipperPrice: number;
  vendorPrice: number;
  shipmentDate: string;
  shipmentStatus: string;
  driverName: string;
  driverPhone: string;
  truckNumber: string;
};

export type Vendor = {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  vendorBankDetail: VendorBankDetail;
};

export type VendorBankDetail = {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
};

export interface IVendors {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  vendorBankDetail: VendorBankDetail;
}
export interface IPrice {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  price: number;
  route: IRoutes;
}

export interface IResponse<T> {
  isSuccess: boolean;
  responseCode: string;
  responseMessage: string;
  responseData: T[];
  metaData: string;
}

export interface Iorganization {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  organizationName: string;
  agreedInterestRate: number;
  wallet: Wallet;
  members: Member[];
  referredOrganizations: string[];
}

export interface Wallet {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  availableLoanAmount: number;
  loanAmountInUse: number;
  interestEarned: number;
  organization: Organization;
}

export interface Organization {
  id: string;
  organizationName: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  position: string;
  phoneNumber: string;
  userType: string;
  organizationId: string;
}

export const formSchema = z.object({
  origin: z.string(),
  destination: z.string(),
});
export const updateRouteSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  id: z.string(),
});

export const vendorSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  phone: z.string(),
  email: z.string().email(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankName: z.string(),
});
export const initialAdminSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});
export const organizationSchema = z.object({
  organizationName: z.string(),
  agreedInterestRate: z.string(),
  // referringOrganizationId: z.string().uuid(),
  // organizationType: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export const memberSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(), // validates email format
  phoneNumber: z.string(),
  gender: z.string(),
  position: z.string(),
  userRole: z.string(), // valid values based on the provided data
});
export const organizationUpdateSchema = z.object({
  agreedInterestRate: z.string(),
});
export const vendorUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

export const priceSchema = z.object({
  shipperId: z.string().uuid(),
  shipperPrices: z.array(
    z.object({
      routeId: z.string().uuid(),
      price: z.number().min(0),
    })
  ),
});
export const priceUpdateSchema = z.object({
  shipperPriceId: z.string().uuid(),
  newPrice: z.string(),
});

export const UpdatePriceSchema = z.object({
  newPrice: z.string(),
});
