import { describe, expect, test, vi } from 'vitest'

import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './current-account-adapter'

vi.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()

    const setSpy = vi.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('should call throw unexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter({
        accessToken: '',
        name: '',
      })
    }).toThrow(new UnexpectedError())
  })

  test('should call LocalStorageAdapter.get with correct value', () => {
    const account = mockAccountModel()

    const getSpy = vi.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)

    const result = getCurrentAccountAdapter()

    expect(getSpy).toHaveBeenCalledWith('account')
    expect(result).toEqual(account)
  })
})
