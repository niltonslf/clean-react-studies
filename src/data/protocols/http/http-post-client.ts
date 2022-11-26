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
export interface HttpPostClient<Body, Response> {
  post: (params: HttpPostParams<Body>) => Promise<HttpResponse<Response>>
}
