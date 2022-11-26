const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (field: string, error: string): void => {
  cy.getByTestId(`${field}-error`).should('include.text', error)
}

export const testUrl = (path: string): void => {
  cy.url().should('equal', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)))
}
