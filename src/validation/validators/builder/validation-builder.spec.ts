import { expect, describe, test } from 'vitest'

import {
  ValidationBuilder as sut,
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators'
import { faker } from '@faker-js/faker'

import { CompareFieldValidation } from '../compare-fields/compare-fields-validation'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column()

    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('should return EmailValidation', () => {
    const field = faker.database.column()

    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.random.numeric() as any as number

    const validations = sut.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('should return CompareFieldValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldValidation(field, fieldToCompare)])
  })

  test('should return a list of validations', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const length = faker.random.numeric() as any as number

    const validations = sut
      .field(field)
      .required()
      .min(length)
      .email()
      .sameAs(fieldToCompare)
      .build()

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
      new CompareFieldValidation(field, fieldToCompare),
    ])
  })
})
