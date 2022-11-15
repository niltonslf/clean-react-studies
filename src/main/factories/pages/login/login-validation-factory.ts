import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeLoginValidationFactory = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').min(5).required().build(),
  ])
}
