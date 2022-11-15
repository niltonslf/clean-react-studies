import { describe, expect, test } from 'vitest'

import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

import { makeLoginValidationFactory } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations ', () => {
    const composite = makeLoginValidationFactory()

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').email().required().build(),
        ...ValidationBuilder.field('password').min(5).required().build(),
      ])
    )
  })
})
