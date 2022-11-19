/* eslint-disable max-len */
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapterFactory } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalSaveAccessTokenFactory = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapterFactory())
}
