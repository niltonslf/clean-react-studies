import { ValidationBuilder as sut, RequiredFieldValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
