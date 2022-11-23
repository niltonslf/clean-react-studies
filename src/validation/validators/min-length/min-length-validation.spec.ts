import { expect, describe, test } from 'vitest'

import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

import { MinLengthValidation } from './min-length-validation'

const makeSut = (input: string): MinLengthValidation => {
  return new MinLengthValidation(input, 5)
}

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exist in schema', () => {
    const sut = makeSut(faker.database.column())

    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
