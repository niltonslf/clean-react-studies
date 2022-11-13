import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

import { MinLengthValidation } from './min-length-validation'

const makeSut = (minLength: number): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), minLength)
}

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSut(5)

    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const sut = makeSut(5)

    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
