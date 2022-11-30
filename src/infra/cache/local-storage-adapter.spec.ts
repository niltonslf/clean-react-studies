import { beforeEach, describe, expect, test, vi } from 'vitest'

import { mockAccountModel } from '@/domain/test'
import { faker } from '@faker-js/faker'

import 'vitest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

// @ts-expect-error
delete global.localStorage

global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(),
  length: faker.datatype.number(),
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should call LocalStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()

    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('should call LocalStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()

    const getItemSpy = vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(value))

    const account = sut.get(key)

    expect(account).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
