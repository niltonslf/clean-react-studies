import { faker } from '@faker-js/faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should render Login', () => {
    cy.getByTestId('email-error').should('include.text', 'Campo obrigatório')
    cy.getByTestId('password-error').should('include.text', 'Campo inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-error').should('include.text', 'Campo inválido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-error').should('include.text', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
  })
})
