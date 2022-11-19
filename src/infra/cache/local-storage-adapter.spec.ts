import { beforeEach, describe, expect, test } from 'vitest'

import { faker } from '@faker-js/faker'

import 'vitest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should call LocalStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.datatype.uuid()

    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
