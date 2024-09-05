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
export interface IPrice {
  id: string
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
  price: number
  route: IRoutes
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
export const updateRouteSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  id: z.string()
})

export const vendorSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  phone: z.string(),
  email: z.string().email()
})
export const vendorUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  phone: z.string(),
  email: z.string().email()
})

export const priceSchema = z.object({
  shipperId: z.string().uuid(),
  shipperPrices: z.array(
    z.object({
      routeId: z.string().uuid(),
      price: z.number().min(0)
    })
  )
})
export const priceUpdateSchema = z.object({
  shipperPriceId: z.string().uuid(),
  newPrice: z.string()
})

export const uPriceSchema = z.object({
  newPrice: z.string()
})
