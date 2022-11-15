import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { Authentication } from '@/domain/usecases'

import { makeAxiosHttpClientFactory } from '../../http/axios-http-client-factory'

export const makeRemoteAuthenticationFactory = (): Authentication => {
  return new RemoteAuthentication(`/login`, makeAxiosHttpClientFactory())
}
