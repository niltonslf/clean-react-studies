import { expect, describe, test } from 'vitest'

import { CompareFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

import { CompareFieldValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldValidation =>
  new CompareFieldValidation(field, fieldToCompare)

describe('CompareFieldValidation', () => {
  test('should return error if compare is invalid ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.words(),
      [fieldToCompare]: faker.random.words(),
    })

    expect(error).toEqual(new CompareFieldError())
  })

  test('should return success if compare is valid ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const value = faker.random.words()

    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    })

    expect(error).toBeFalsy()
  })
})
