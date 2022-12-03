import axios, { AxiosInstance, AxiosResponse } from 'axios'

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any>, HttpGetClient {
  private readonly axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    })
  }

  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let response: AxiosResponse

    try {
      response = await this.axiosInstance.post(params.url, params.body)
    } catch (error: any) {
      response = error.response
    }

    return this.adapt(response)
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await axios.get(params.url, { headers: params.headers })
    } catch (error: any) {
      response = error.response
    }
    return this.adapt(response)
  }

  private adapt(response: AxiosResponse): HttpResponse {
    return { statusCode: response.status, body: response.data }
  }
}
