import { describe, expect, test, vi } from 'vitest'

import { SetStorageMock } from '@/data/test/mock-storage'
import { faker } from '@faker-js/faker'

import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return { sut, setStorageMock }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.datatype.uuid()
    sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('should throw error if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    vi.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())

    const promise = sut.save(faker.datatype.uuid())

    await expect(promise).rejects.toThrow(new Error())
  })
})
