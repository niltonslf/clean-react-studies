import { describe, expect, test } from 'vitest'

import { SetStorageSpy } from '@/data/test/mock-storage'
import { faker } from '@faker-js/faker'

import { LocalSaveAccessToken } from './local-save-access-token'

describe('LocalSaveAccessToken', () => {
  test('should save access token', () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)

    const accessToken = faker.datatype.uuid()
    sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
