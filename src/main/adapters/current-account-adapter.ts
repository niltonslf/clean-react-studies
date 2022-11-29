/* eslint-disable max-len */
import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapterFactory } from '@/main/factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account) throw new UnexpectedError()
  makeLocalStorageAdapterFactory().set('account', account)
}
