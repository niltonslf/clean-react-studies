import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { expect, describe, test, vi, afterEach } from 'vitest'

import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, Helper, ValidationSpy } from '@/presentation/test'
import { SaveAccessTokenMock } from '@/presentation/test/save-access-token-mock'
import { faker } from '@faker-js/faker'
import { act, cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationSpy}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return { sut, validationSpy, authenticationSpy, saveAccessTokenMock }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
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

  test('should return error on password or email field ', () => {
    const { sut, validationSpy } = makeSut()
    const passwordFaker = faker.internet.password()

    Helper.populateField(sut, 'password', passwordFaker)
    Helper.populateField(sut, 'email', passwordFaker)

    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage

    expect(validationSpy.validate('password', faker.random.words())).toBe(errorMessage)
    expect(validationSpy.validate('email', faker.random.words())).toBe(errorMessage)
  })

  test('should enable submit button when type email and password', () => {
    const { sut } = makeSut()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    Helper.populateField(sut, 'email', faker.internet.email())
    Helper.populateField(sut, 'password', faker.internet.password())

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
    vi.spyOn(authenticationSpy, 'auth').mockReturnValue(Promise.reject(error))

    const errorWrap = sut.getByTestId('error-wrap')

    await act(async () => simulateValidSubmit(sut))

    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('should call SaveLocalAccessToken on sucess', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    simulateValidSubmit(sut)

    await waitFor(() => sut.getByTestId('form'))

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('register')

    fireEvent.click(register)

    expect(history.location.pathname).toBe('/signup')
  })
})
