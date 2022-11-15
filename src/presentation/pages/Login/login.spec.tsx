import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { act, cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

import 'jest-localstorage-mock'

import Login from './index'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>
  )

  return { sut, validationSpy, authenticationSpy }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })

  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => localStorage.clear())

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

  test('should return error on password or email field ', () => {
    const { sut, validationSpy } = makeSut()
    const passwordFaker = faker.internet.password()

    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: passwordFaker } })
    fireEvent.input(emailInput, { target: { value: passwordFaker } })

    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage

    expect(validationSpy.validate('password', faker.random.words())).toBe(errorMessage)
    expect(validationSpy.validate('email', faker.random.words())).toBe(errorMessage)
  })

  test('should enable submit button when type email and password', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const emailInput = sut.getByTestId('email')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    expect(submitButton.disabled).toBe(false)
  })

  test('should show Loader when pressed submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const Loader = sut.getByTestId('loader')
    expect(Loader).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()

    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValue(Promise.reject(error))

    const errorWrap = sut.getByTestId('error-wrap')

    act(() => {
      simulateValidSubmit(sut)
    })

    setTimeout(() => {
      const mainError = sut.getByTestId('main-error')
      expect(mainError.textContent).toBe(error.message)
      expect(errorWrap.childElementCount).toBe(2)
    }, 2000)
  })

  test('should add token to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)

    await waitFor(() => sut.getByTestId('form'))

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('register')

    fireEvent.click(register)

    expect(history.location.pathname).toBe('/signup')
  })
})
