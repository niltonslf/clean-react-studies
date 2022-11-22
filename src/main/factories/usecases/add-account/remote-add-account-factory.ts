import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { AddAccount } from '@/domain/usecases'

import { makeAxiosHttpClientFactory } from '../../http/axios-http-client-factory'

export const makeRemoteAddAccountFactory = (): AddAccount => {
  return new RemoteAddAccount(`/signup`, makeAxiosHttpClientFactory())
}
