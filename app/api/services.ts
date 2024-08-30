import { UserFormValue } from '@/components/forms/user-auth-form'
import axiosInstance from '@/lib/axiosInstance'
import { IResponse } from '@/types/admin'
import { AxiosResponse } from 'axios'
import { RouteFormValue } from '../dashboard/routes/page'
import { VendorFormValue } from '../dashboard/vendors/page'

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
    await getAllShippers()
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
    await getAllVendors()
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
export const updateShipper = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.put('shippers', data)
    return response.data
  } catch (error) {}
}
export const updateVendor = async (data: VendorFormValue) => {
  try {
    const response = await axiosInstance.put('vendors', data)
    return response.data
  } catch (error) {}
}
