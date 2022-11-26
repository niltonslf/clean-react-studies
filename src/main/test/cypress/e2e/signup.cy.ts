import { faker } from '@faker-js/faker'

import { testInputStatus } from '../support/form-helper'

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should render SignUp', () => {
    testInputStatus('name', 'Campo inválido')
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo inválido')
    testInputStatus('password-confirmation', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(4))
    testInputStatus('name', 'Campo inválido')

    cy.getByTestId('email').type(faker.random.word())
    testInputStatus('email', 'Campo inválido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    testInputStatus('password', 'Campo inválido')

    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(5))
    testInputStatus('password-confirmation', 'Os campos precisam ser iguais.')

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

    cy.getByTestId('submit').should('have.attr', 'disabled')
  })
})
