import { beforeEach, describe, expect, test } from 'vitest'

import { faker } from '@faker-js/faker'

import 'vitest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should call LocalStorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.fullName(),
    }

    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
