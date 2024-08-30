import * as z from 'zod'

export interface IRoutes {
  id: string
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
  origin: string
  destination: string
}

export interface IVendors {
  id: string
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
  name: string
  address: string
  city: string
  state: string
  country: string
  phone: string
  email: string
}

export interface IResponse<T> {
  isSuccess: boolean
  responseCode: string
  responseMessage: string
  responseData: T[]
  metaData: string
}

export const formSchema = z.object({
  origin: z.string(),
  destination: z.string()
})

export const vendorSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  phone: z.string(),
  email: z.string()
})

export const shipperSchema = z.object({})
