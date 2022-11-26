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
})

export class HttpPostClientSpy<Body, Response> implements HttpPostClient<Body, Response> {
  url?: string
  body?: Body
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok,
  }

  async post(params: HttpPostParams<Body>): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<Response> implements HttpGetClient<Response> {
  url: string
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok,
  }

  async get(params: HttpGetParams): Promise<HttpResponse<Response>> {
    this.url = params.url

    return this.response
  }
}
