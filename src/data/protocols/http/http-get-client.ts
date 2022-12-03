import { HttpResponse } from '.'

export type HttpGetParams = {
  url: string
  headers?: any
}

export interface HttpGetClient<Response = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<Response>>
}
