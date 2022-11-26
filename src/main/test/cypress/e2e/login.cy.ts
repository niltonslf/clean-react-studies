import { faker } from '@faker-js/faker'

import { testInputStatus, testLocalStorageItem, testUrl } from '../support/form-helper'
import { mockInvalidCredentialsError, mockOk } from './login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should render Login', () => {
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    testInputStatus('email', 'Campo inválido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    testInputStatus('password', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('should present valid state if form is valid', () => {
    simulateValidSubmit()

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error if invalid credentials are provided', () => {
    mockInvalidCredentialsError()

    simulateValidSubmit()

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('main-error')
      .should('exist')
      .contains('Credenciais inválidas')

    testUrl('/login')
  })

  it('should save accessToken if valid credentials are provided', () => {
    mockOk()

    simulateValidSubmit()

    cy.getByTestId('submit').click()

    testUrl('/')
    testLocalStorageItem('accessToken')
  })

  it('should not call submit if form is invalid', () => {
    mockOk()

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submit').click()

    cy.get('@request.all').should('have.length', 0)
  })
})
