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
})
