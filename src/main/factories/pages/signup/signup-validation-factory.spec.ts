import { describe, expect, test } from 'vitest'

import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

import { makeSignUpValidationFactory } from './signup-validation-factory'

describe('SignUpValidationFactory', () => {
  test('should make ValidationComposite with correct validations ', () => {
    const composite = makeSignUpValidationFactory()

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').min(5).required().build(),
        ...ValidationBuilder.field('email').email().required().build(),
        ...ValidationBuilder.field('password').min(5).required().build(),
        ...ValidationBuilder.field('passwordConfirmation').min(5).required().build(),
      ])
    )
  })
})
