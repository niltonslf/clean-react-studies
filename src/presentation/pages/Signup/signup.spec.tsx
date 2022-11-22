import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'

import { SignUp } from '@/presentation/pages'
import { AddAccountSpy, Helper, ValidationSpy } from '@/presentation/test/'
import { testChildCount } from '@/presentation/test/form-helper'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string | undefined
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationSpy()
  validationStub.errorMessage = params?.validationError ?? ''

  const addAccountSpy = new AddAccountSpy()

  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp validation={validationStub} addAccount={addAccountSpy} />
    </Router>
  )

  return { sut, addAccountSpy }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.fullName(),
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
  await waitFor(() => submitButton)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testFieldIsEmpty(sut, 'name')
    Helper.testFieldIsEmpty(sut, 'email')
    Helper.testFieldIsEmpty(sut, 'password')
    Helper.testFieldIsEmpty(sut, 'passwordConfirmation')

    Helper.testChildCount(sut, 'name-group', 1)
    Helper.testChildCount(sut, 'email-group', 1)
    Helper.testChildCount(sut, 'password-group', 1)
    Helper.testChildCount(sut, 'password-confirmation-group', 1)
  })

  test('should show Name error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    testChildCount(sut, 'name-group', 2)
  })

  test('should show Email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    testChildCount(sut, 'email-group', 2)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    testChildCount(sut, 'password-group', 2)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    testChildCount(sut, 'password-confirmation-group', 2)
  })

  test('should valid name state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    testChildCount(sut, 'name-group', 1)
  })

  test('should valid email state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    testChildCount(sut, 'email-group', 1)
  })

  test('should valid password state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    testChildCount(sut, 'password-group', 1)
  })

  test('should valid name state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    testChildCount(sut, 'password-confirmation-group', 1)
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    const password = faker.internet.password()

    Helper.populateField(sut, 'name', faker.name.fullName())
    Helper.populateField(sut, 'email', faker.internet.email())
    Helper.populateField(sut, 'password', password)
    Helper.populateField(sut, 'passwordConfirmation', password)

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })
  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'loader')
  })

  test('should call AddAccount with correct values', () => {
    const { sut, addAccountSpy } = makeSut()

    const name = faker.name.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('should call Authentication only once', () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, name, email, password)
    simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should present error if Authentication fails', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })

    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })
})
