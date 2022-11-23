/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    // @ts-expect-error
    return !input[this.field] || emailRegex.test(input[this.field]) ? null : new InvalidFieldError()
  }
}
