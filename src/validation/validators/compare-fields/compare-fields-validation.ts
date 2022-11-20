import { CompareFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldValidation implements FieldValidation {
  constructor(readonly field: string, private readonly valueToCompare: string) {}

  validate(value: string): Error | null {
    if (!value || this.valueToCompare === value) return null

    return new CompareFieldError()
  }
}
