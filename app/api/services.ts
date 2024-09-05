import { UserFormValue } from '@/components/forms/user-auth-form'
import axiosInstance from '@/lib/axiosInstance'
import { RouteFormValue } from '../dashboard/routes/page'
import { VendorFormValue, VendorUpdateValue } from '../dashboard/vendors/page'
import { UpdatePriceValue } from '@/components/tables/admin-tables/price-list/column'

export interface LoginResponse {
  isSuccess: boolean
  responseCode: string
  responseMessage: string
  responseData: {
    accessToken: string
    refreshToken: string
    roles: string[]
    userType: number
  }
  metaData: any
}

export const signIn = async (credentials: UserFormValue) => {
  try {
    const response = await axiosInstance.post('users/login', credentials)
    return response.data
  } catch (error) {
    console.error('Error fetching user data', error)
  }
}

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const expiredToken = localStorage.getItem('token')
  if (!refreshToken) throw new Error('No refresh token found')

  try {
    const response = await axiosInstance.post('users/refreshToken', {
      refreshToken: refreshToken,
      expiredToken: expiredToken
    })
    const newAccessToken = response.data.accessToken

    // Update the access token in localStorage
    localStorage.setItem('token', newAccessToken)

    return newAccessToken
  } catch (error) {
    console.error('Failed to refresh token', error)
    throw error
  }
}
export const deleteRoute = async (routeId: string) => {
  try {
    const response = await axiosInstance.delete(`routes/${routeId}`, {
      data: { routeId: routeId }
    })
    await getAllRoutes()
    return response.data
  } catch (error) {
    console.error('Error fetching user data', error)
  }
}
export const deleteShipper = async (shipperId: string) => {
  try {
    const response = await axiosInstance.delete(`shippers/${shipperId}`, {
      data: { shipperId: shipperId }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user data', error)
  }
}
export const deletePrice = async (shipperPriceId: string) => {
  try {
    const response = await axiosInstance.delete('shippers/delete-price', {
      data: { shipperPriceId: shipperPriceId }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user data', error)
  }
}
export const deleteVPrice = async (vendorPriceId: string) => {
  try {
    const response = await axiosInstance.delete('vendors/delete-price', {
      data: { vendorPriceId: vendorPriceId }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user data', error)
  }
}
export const deleteVendor = async (vendorId: string) => {
  try {
    const response = await axiosInstance.delete(`vendors/${vendorId}`, {
      data: { vendorId: vendorId }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user data', error)
  }
}

export const getAllRoutes = async () => {
  try {
    const response = await axiosInstance.get('routes')
    return response.data
  } catch (error) {}
}
export const getAllVendors = async () => {
  try {
    const response = await axiosInstance.get('vendors')
    return response.data
  } catch (error) {}
}
export const getAllShippers = async () => {
  try {
    const response = await axiosInstance.get('shippers')
    return response.data
  } catch (error) {}
}
export const getAllPrice = async () => {
  try {
    const response = await axiosInstance.get('shippers/price-list')
    return response.data
  } catch (error) {}
}

export const getAllVPrice = async () => {
  try {
    const response = await axiosInstance.get('vendors/price-list')
    return response.data
  } catch (error) {}
}

export const addNewRoute = async (data: RouteFormValue) => {
  try {
    const response = await axiosInstance.post('routes', data)
    return response.data
  } catch (error) {}
}
export const addNewShipper = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.post('shippers', data)
    return response.data
  } catch (error) {}
}
export const createPrice = async (data: UpdatePriceValue) => {
  try {
    const response = await axiosInstance.post('shippers/create-prices', data)
    return response.data
  } catch (error) {}
}
export const createVendorPrice = async (data: any) => {
  try {
    const response = await axiosInstance.post('vendors/create-prices', data)
    return response.data
  } catch (error) {}
}
export const addNewVendor = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.post('vendors', data)
    return response.data
  } catch (error) {}
}

export const updateRoute = async (data: RouteFormValue) => {
  try {
    const response = await axiosInstance.put('routes', data)
    return response.data
  } catch (error) {}
}
export const updateShipper = async (data: VendorUpdateValue) => {
  try {
    const response = await axiosInstance.put('shippers', data)
    return response.data
  } catch (error) {}
}
export const updatePrice = async (data: UpdatePriceValue) => {
  try {
    const response = await axiosInstance.put('shippers/update-price', data)
    return response.data
  } catch (error) {}
}
export const updateVendor = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.put('vendors', data)
    return response.data
  } catch (error) {}
}
