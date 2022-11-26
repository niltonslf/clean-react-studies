import { faker } from '@faker-js/faker'

import * as FormHelper from '../support/form-helper'
import * as Http from './signup-mocks'

const simulateValidSubmit = (): void => {
  const password = faker.internet.password()

  cy.getByTestId('name').type(faker.name.fullName())
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)

  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should render SignUp', () => {
    FormHelper.testInputStatus('name', 'Campo inválido')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo inválido')
    FormHelper.testInputStatus('password-confirmation', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('name', 'Campo inválido')

    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Campo inválido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('password', 'Campo inválido')

    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password-confirmation', 'Os campos precisam ser iguais.')

    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.fullName())
    cy.getByTestId('name-group').find('*').should('have.lengthOf', 1)

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-group').find('*').should('have.lengthOf', 1)

    const password = faker.internet.password()
    cy.getByTestId('password').type(password)
    cy.getByTestId('password-group').find('*').should('have.lengthOf', 1)

    cy.getByTestId('passwordConfirmation').type(password)
    cy.getByTestId('password-confirmation-group').find('*').should('have.lengthOf', 1)

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
  })

  it('should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()

    simulateValidSubmit()
    FormHelper.testMainError('Esse e-mail já está em uso.')
    FormHelper.testUrl('/signup')
  })
})
