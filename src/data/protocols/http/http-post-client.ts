import { HttpResponse } from './'

export type HttpPostParams<Body> = {
  url: string
  body?: Body
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
