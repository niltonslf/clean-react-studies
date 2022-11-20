import { expect, describe, test } from 'vitest'

import { CompareFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

import { CompareFieldValidation } from './compare-fields-validation'

const makeSut = (compareValue: string): CompareFieldValidation =>
  new CompareFieldValidation(faker.database.column(), compareValue)

describe('CompareFieldValidation', () => {
  test('should return error if compare is invalid ', () => {
    const sut = makeSut(faker.random.words())
    const error = sut.validate(faker.random.words())

    expect(error).toEqual(new CompareFieldError())
  })
})
