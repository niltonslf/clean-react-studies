import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/context'
import { SignUp } from '@/presentation/pages'
import { AddAccountSpy, Helper, ValidationSpy } from '@/presentation/test/'
import { faker } from '@faker-js/faker'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string | undefined
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationSpy()
  validationStub.errorMessage = params?.validationError ?? ''

  const addAccountSpy = new AddAccountSpy()

  const setCurrentAccountMock = vi.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return { addAccountSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (
  name = faker.name.fullName(),
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)

  const submitButton = screen.getByTestId('submit')
  fireEvent.click(submitButton)
  await waitFor(() => submitButton)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    makeSut({ validationError: 'error' })

    expect(screen.getByTestId('name')).toHaveValue('')
    expect(screen.getByTestId('email')).toHaveValue('')
    expect(screen.getByTestId('password')).toHaveValue('')
    expect(screen.getByTestId('passwordConfirmation')).toHaveValue('')

    expect(screen.getByTestId('name-group').children).toHaveLength(2)
    expect(screen.getByTestId('email-group').children).toHaveLength(2)
    expect(screen.getByTestId('password-group').children).toHaveLength(2)
    expect(screen.getByTestId('password-confirmation-group').children).toHaveLength(2)

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)

    expect(screen.getByTestId('submit')).toBeDisabled()
  })

  test('should show Name error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    expect(screen.getByTestId('name-group').children).toHaveLength(2)
  })

  test('should show Email error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    expect(screen.getByTestId('email-group').children).toHaveLength(2)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    expect(screen.getByTestId('password-group').children).toHaveLength(2)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('password-confirmation-group').children).toHaveLength(2)
  })

  test('should valid name state if validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    expect(screen.getByTestId('name-group').children).toHaveLength(1)
  })

  test('should valid email state if validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    expect(screen.getByTestId('email-group').children).toHaveLength(1)
  })

  test('should valid password state if validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    expect(screen.getByTestId('password-group').children).toHaveLength(1)
  })

  test('should valid name state if validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('password-confirmation-group').children).toHaveLength(1)
  })

  test('should enable submit button if form is valid', () => {
    makeSut()

    const password = faker.internet.password()

    Helper.populateField('name', faker.name.fullName())
    Helper.populateField('email', faker.internet.email())
    Helper.populateField('password', password)
    Helper.populateField('passwordConfirmation', password)

    expect(screen.getByTestId('submit')).toBeEnabled()
  })
  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()

    expect(screen.queryByTestId('loader')).toBeInTheDocument()
  })

  test('should call AddAccount with correct values', () => {
    const { addAccountSpy } = makeSut()

    const name = faker.name.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('should call Authentication only once', () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(name, email, password)
    simulateValidSubmit(name, email, password)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should present error if Authentication fails', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })

    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()

    vi.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await act(async () => await simulateValidSubmit())

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('should call SaveLocalAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    await act(async () => await simulateValidSubmit())
    await waitFor(() => screen.getByTestId('form'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  test('should go back to login page', () => {
    makeSut()
    const register = screen.getByTestId('login-link')

    fireEvent.click(register)

    expect(history.location.pathname).toBe('/login')
  })
})
