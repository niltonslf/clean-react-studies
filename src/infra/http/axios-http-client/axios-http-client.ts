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
    let response: AxiosResponse<any>

    try {
      response = await this.axiosInstance.post(params.url, params.body)
    } catch (error: any) {
      response = error.response
    }

    return { statusCode: response.status, body: response.data }
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    const response = await axios.get(params.url)

    return { statusCode: response.status, body: response.data }
  }
}
