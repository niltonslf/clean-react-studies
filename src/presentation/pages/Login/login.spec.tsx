import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { expect, describe, test, vi } from 'vitest'

import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/context'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, Helper, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'

type SutTypes = {
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()

  const setCurrentAccountMock = vi.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <Login validation={validationSpy} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return { validationSpy, authenticationSpy, setCurrentAccountMock }
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const submitButton = screen.getByTestId('submit')
  fireEvent.click(submitButton)
}

describe('Login Component', () => {
  test('Should render with initial state', () => {
    makeSut()

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email')).toHaveValue('')
    expect(screen.getByTestId('password')).toHaveValue('')
  })

  test('should return error on password or email field ', () => {
    const { validationSpy } = makeSut()
    const passwordFaker = faker.internet.password()

    Helper.populateField('password', passwordFaker)
    Helper.populateField('email', passwordFaker)

    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage

    expect(validationSpy.validate('password', { field: faker.random.words() })).toBe(errorMessage)
    expect(validationSpy.validate('email', { field: faker.random.words() })).toBe(errorMessage)
  })

  test('should enable submit button when type email and password', () => {
    makeSut()

    Helper.populateField('email', faker.internet.email())
    Helper.populateField('password', faker.internet.password())

    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('should show Loader when pressed submit', () => {
    makeSut()

    simulateValidSubmit()

    const Loader = screen.getByTestId('loader')
    expect(Loader).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    simulateValidSubmit(email, password)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should call SaveLocalAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    simulateValidSubmit()

    await waitFor(() => screen.getByTestId('form'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', () => {
    makeSut()
    const register = screen.getByTestId('register')

    fireEvent.click(register)

    expect(history.location.pathname).toBe('/signup')
  })
})
