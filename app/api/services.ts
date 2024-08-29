import { UserFormValue } from '@/components/forms/user-auth-form'
import axiosInstance from '@/lib/axiosInstance'
import { IResponse } from '@/types/admin'
import { AxiosResponse } from 'axios'
import { RouteFormValue } from '../dashboard/routes/page'

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
  const token = localStorage.getItem('token')
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

export const getAllRoutes = async () => {
  try {
    const response = await axiosInstance.get('routes')
    return response.data
  } catch (error) {}
}

export const addNewRoute = async (data: RouteFormValue) => {
  try {
    const response = await axiosInstance.post('routes', data)
    return response.data
  } catch (error) {}
}

export const updateRoute = async (data: RouteFormValue) => {
  try {
    const response = await axiosInstance.put('routes', data)
    return response.data
  } catch (error) {}
}
