export interface IRoutes {
  id: string
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
  origin: string
  destination: string
}

export interface IResponse<T> {
  isSuccess: boolean
  responseCode: string
  responseMessage: string
  responseData: T[]
  metaData: string
}
