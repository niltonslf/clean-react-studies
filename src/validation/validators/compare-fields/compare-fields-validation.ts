import { CompareFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldValidation implements FieldValidation {
  constructor(readonly field: string, private readonly fieldToCompare: string) {}

  validate(input: object): Error | null {
    // @ts-expect-error
    if (input[this.field] === input[this.fieldToCompare]) return null

    return new CompareFieldError()
  }
}
