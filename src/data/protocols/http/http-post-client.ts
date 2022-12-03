import { HttpResponse } from './'

export type HttpPostParams<Body> = {
  url: string
  body?: Body
  headers?: any
}

/**
 *
 * @interface HttpPostClient
 * @template Body
 * @template Response
 */
export interface HttpPostClient<Body = any, Response = any> {
  post: (params: HttpPostParams<Body>) => Promise<HttpResponse<Response>>
}
