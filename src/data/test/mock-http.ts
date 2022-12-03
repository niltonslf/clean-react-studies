import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url() as any as string,
  body: faker.datatype.json(),
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url() as any as string,
  headers: faker.datatype.json(),
})

/**
 *
 * @class HttpPostClientSpy
 * @implements {HttpPostClient<Body, Response>}
 * @template Body
 * @template Response
 */
export class HttpPostClientSpy<Body, Response> implements HttpPostClient<Body, Response> {
  url?: string
  body?: Body
  headers?: any
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok,
  }

  async post(params: HttpPostParams<Body>): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}

/**
 *
 *
 * @class HttpGetClientSpy
 * @implements {HttpGetClient<Response>}
 * @template Response
 */
export class HttpGetClientSpy<Response> implements HttpGetClient<Response> {
  url: string
  headers?: any
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok,
  }

  async get(params: HttpGetParams): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.headers = params.headers

    return this.response
  }
}
