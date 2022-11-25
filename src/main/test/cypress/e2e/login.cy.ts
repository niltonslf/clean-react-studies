import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

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

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('loader')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('main-error')
      .should('exist')
      .contains('Credenciais inválidas')

    cy.url().should('equal', `${baseUrl}/login`)
  })

  it('should save accessToken if valid credentials are provided', () => {
    cy.getByTestId('email').type('mango@gmail.com')
    cy.getByTestId('password').type('12345')

    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('loader')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')

    cy.url().should('equal', `${baseUrl}/`)

    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
