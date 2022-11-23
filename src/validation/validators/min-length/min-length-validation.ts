import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error | null {
    // @ts-expect-error
    if (input[this.field]?.length < this.minLength) return new InvalidFieldError()

    return null
  }
}
