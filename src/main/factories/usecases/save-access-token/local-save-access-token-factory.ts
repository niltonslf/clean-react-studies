/* eslint-disable max-len */
import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { UpdateCurrentAccount } from '@/domain/usecases'
import { makeLocalStorageAdapterFactory } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapterFactory())
}
