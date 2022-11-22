import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'

import { SignUp } from '@/presentation/pages'
import { Helper, ValidationSpy } from '@/presentation/test/'
import { testChildCount } from '@/presentation/test/form-helper'
import { faker } from '@faker-js/faker'
import { cleanup, render, RenderResult } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string | undefined
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationSpy()
  validationStub.errorMessage = params?.validationError ?? ''

  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp validation={validationStub} />
    </Router>
  )

  return { sut }
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
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    const password = faker.internet.password()

    Helper.populateField(sut, 'name', faker.name.fullName())
    Helper.populateField(sut, 'email', faker.internet.email())
    Helper.populateField(sut, 'password', password)
    Helper.populateField(sut, 'passwordConfirmation', password)

    expect(submitButton.disabled).toBe(false)
  })
})
