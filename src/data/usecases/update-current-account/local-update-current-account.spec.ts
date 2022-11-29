import { describe, expect, test, vi } from 'vitest'

import { SetStorageMock } from '@/data/test'
import { mockAccountModel } from '@/domain/test'

import { LocalUpdateCurrentAccount } from './local-update-current-account'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)

  return { sut, setStorageMock }
}

describe('LocalUpdateCurrentAccount', () => {
  test('should call SetStorage with correct value', () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()
    sut.save(account)

    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  test('should throw error if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    vi.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())

    const promise = sut.save(mockAccountModel())

    await expect(promise).rejects.toThrow(new Error())
  })
})
