import { refreshAccessToken } from '@/app/api/services'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://logisfi-pro-api.somee.com/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or any other headers if needed
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    console.log(originalRequest)

    // Check if the error status is 401 and the request has not been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Refresh the token
        const newAccessToken = await refreshAccessToken()

        // Update the authorization header and retry the request
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError)
        window.location.href = '/'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
