import { describe, expect, test, vi } from 'vitest'

import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

import { setCurrentAccountAdapter } from './current-account-adapter'

vi.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()

    const setSpy = vi.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
