import { Validation } from '@/presentation/protocols/validation'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

import Login from './index'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return { sut, validationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should render with initial state', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailInput = getByTestId('email') as HTMLInputElement
    expect(emailInput.value).toBe('')

    const passwordInput = getByTestId('password') as HTMLInputElement
    expect(passwordInput.value).toBe('')
  })

  test('should call validation with correct email ', () => {
    const { sut, validationSpy } = makeSut()
    const emailFaker = faker.internet.email()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: emailFaker } })

    expect(validationSpy.input).toEqual({ email: emailFaker })
  })

  test('should call validation with correct password ', () => {
    const { sut, validationSpy } = makeSut()
    const passwordFaker = faker.internet.password()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: passwordFaker } })

    expect(validationSpy.input).toEqual({ password: passwordFaker })
  })
})
