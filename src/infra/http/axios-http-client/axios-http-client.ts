import axios, { AxiosResponse } from 'axios'

import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let response: AxiosResponse<any>

    try {
      response = await axios.post(params.url, params.body)
    } catch (error: any) {
      response = error.response
    }

    return { statusCode: response.status, body: response.data }
  }
}
