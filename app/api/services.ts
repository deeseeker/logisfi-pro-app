import { UserFormValue } from "@/components/forms/user-auth-form";
import axiosInstance from "@/lib/axiosInstance";
import { RouteFormValue } from "../dashboard/routes/page";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { UpdateProfileForm } from "@/components/forms/edit-profile";
import { UpdatePriceValue } from "@/components/tables/admin-tables/price-list/vendor-price-list/column";
import {
  VendorFormValue,
  VendorUpdateValue,
} from "../dashboard/(clients)/vendor/page";

export interface LoginResponse {
  isSuccess: boolean;
  responseCode: string;
  responseMessage: string;
  responseData: {
    accessToken: string;
    refreshToken: string;
    roles: string[];
    userType: number;
  };
  metaData: any;
}

/*==========GET==========*/
export const getAllRoutes = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.routes);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllBanks = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.banks);
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.orders);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllOrganizations = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.organization);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getOrganizationId = async (params = "") => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.organization}/${params}`
    );
    return response.data?.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllShipments = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.shipment);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllMobilizations = async (params = "") => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.mobilizations}?OrganizationId=${params}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllVendors = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.vendors);
    return response.data?.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getProductTypes = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.productType);
    return response.data?.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getTruckSizes = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.truckSize);
    return response.data?.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllInvestment = async (params = "") => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.investments);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getInvoices = async (params = "") => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.invoice);
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllInvestments = async (params = "") => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.investments}?OrganizationId=${params}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllTransactions = async (params = "") => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.transactions}?OrganizationId=${params}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllShippers = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.shippers);
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllWithdrawals = async () => {
  try {
    const response = await axiosInstance.get("finances/fund-withdrawals");
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.profile}`);
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getAllPrice = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.shippers}/price-list`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllVPrice = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.vendors}/price-list`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllPrices = async (type: "shippers" | "vendors") => {
  try {
    const endpoint = `${API_ENDPOINTS[type]}/price-list`;
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching price list", error);
  }
};
export const generateInvoiceId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`finances/invoice/${id}`);
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getWallet = async (organizationId: string) => {
  try {
    const endpoint = `${API_ENDPOINTS.organization}/${organizationId}/wallet`;
    const response = await axiosInstance.get(endpoint);
    return response.data.responseData;
  } catch (error) {
    console.error("Error fetching wallet details", error);
  }
};

/*==========POST==========*/
export const signIn = async (credentials: UserFormValue) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.login, credentials);
    console.log(response.data.responseMessage);
    // showSuccessAlert(response.data.responseMessage);
    return response.data;
  } catch (error: any) {
    // console.error("Error fetching user data", error);
    console.log(error.response.data.responseMessage);
    return error.response.data;
    // showErrorAlert(error.responseMessage);
  }
};
export const forgotPassword = async (credentials: { email: string }) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.forgotPassword,
      credentials
    );
    console.log(response.data.responseMessage);
    // showSuccessAlert(response.data.responseMessage);
    return response.data;
  } catch (error: any) {
    // console.error("Error fetching user data", error);
    // console.log(error.response.data.responseMessage);
    return error.response.data;
    // showErrorAlert(error.responseMessage);
  }
};
export const resetPassword = async (credentials: { newPassword: string }) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.resetPassword,
      credentials
    );
    console.log(response.data.responseMessage);
    // showSuccessAlert(response.data.responseMessage);
    return response.data;
  } catch (error: any) {
    // console.error("Error fetching user data", error);
    console.log(error.response.data.responseMessage);
    return error.response.data;
    // showErrorAlert(error.responseMessage);
  }
};
export const activateAccount = async (credentials: any) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.activate,
      credentials
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user data", error);
    return error.response.data;
  }
};

export const updateProfile = async (data: UpdateProfileForm) => {
  try {
    const response = await axiosInstance.post("users/update-profile", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const expiredToken = localStorage.getItem("token");
  if (!refreshToken) throw new Error("No refresh token found");

  try {
    const response = await axiosInstance.post(API_ENDPOINTS.refreshToken, {
      refreshToken: refreshToken,
      expiredToken: expiredToken,
    });
    const newAccessToken = response.data.accessToken;

    // Update the access token in localStorage
    localStorage.setItem("token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

export const addNewRoute = async (data: RouteFormValue) => {
  try {
    const response = await axiosInstance.post("routes", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const addNewShipper = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.post("shippers", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const addNewOrganization = async (data: any) => {
  try {
    const response = await axiosInstance.post("organizations", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const dashboard = async (data: any) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.dashboard);
    return response.data.responseData;
  } catch (error) {}
};
export const topupLoan = async (data: any) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.topup, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const addNewMember = async (data: any) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.newmember, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const createPrice = async (data: UpdatePriceValue) => {
  try {
    const response = await axiosInstance.post("shippers/create-prices", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const withdrawFunds = async (data: any) => {
  try {
    const response = await axiosInstance.post("finances/fund-withdrawal", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const generateInvoice = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "finances/generate-invoice",
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createOrder = async (data: any) => {
  try {
    const response = await axiosInstance.post("orders", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const updateOrder = async (data: any) => {
  try {
    const response = await axiosInstance.put("orders", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const createVendorPrice = async (data: any) => {
  try {
    const response = await axiosInstance.post("vendors/create-prices", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const addNewVendor = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.post("vendors", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const fulfillOrder = async (data: any) => {
  try {
    const response = await axiosInstance.post("orders/fulfill", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const availableLoanWallet = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "finances/available-loan-wallets",
      data
    );
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const mobilizeShipment = async (data: any) => {
  try {
    const response = await axiosInstance.post("shipments/mobilize", data);
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const payInvoice = async (data: { invoiceId: string }) => {
  try {
    const response = await axiosInstance.post("finances/invoice-paid", data);
    return response.data.responseData;
  } catch (error: any) {
    throw error.response.data;
  }
};

/*==========DELETE==========*/
export const deleteRoute = async (routeId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.routes}/${routeId}`,
      {
        data: { routeId: routeId },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user data", error);
    throw error.response.data;
  }
};
export const deleteShipper = async (shipperId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.shippers}/${shipperId}`,
      {
        data: { shipperId: shipperId },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching user data", error);
    throw error.response.data;
  }
};

export const deleteOrganization = async (organizationId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.organization}/${organizationId}`,
      {
        data: { id: organizationId },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching user data", error);
    throw error.response.data;
  }
};
export const deletePrice = async (shipperPriceId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.shippers}/delete-price`,
      {
        data: { shipperPriceId: shipperPriceId },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching user data", error);
    throw error.response.data;
  }
};
export const deleteVPrice = async (vendorPriceId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.vendors}/delete-price`,
      {
        data: { vendorPriceId: vendorPriceId },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching user data", error.response.data);
    throw error.response.data;
  }
};
export const deleteVendor = async (vendorId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.vendors}/${vendorId}`,
      {
        data: { vendorId: vendorId },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user data", error);
    throw error.response.data;
  }
};

export const updateRoute = async (data: RouteFormValue) => {
  try {
    const response = await axiosInstance.put("routes", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateShipper = async (data: VendorUpdateValue) => {
  try {
    const response = await axiosInstance.put("shippers", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateOrganization = async (data: {
  organizationId: string;
  agreedInterestRate: number;
}) => {
  try {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.organization}/${data.organizationId}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const updatePrice = async (data: UpdatePriceValue) => {
  try {
    const response = await axiosInstance.put("shippers/update-price", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const updateVPrice = async (data: {
  vendorPriceId: string;
  newPrice: string;
}) => {
  try {
    const response = await axiosInstance.put("vendors/update-price", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const updateVendor = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.put("vendors", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
