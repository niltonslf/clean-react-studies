import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeSignUpValidationFactory = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').min(5).required().build(),
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').min(5).required().build(),
    ...ValidationBuilder.field('passwordConfirmation').min(5).required().build(),
  ])
}
