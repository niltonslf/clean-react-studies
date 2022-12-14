import { faker } from '@faker-js/faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.words(),
    },
  })
}

export const mockUnexpectedError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 500,
    body: {
      error: faker.random.words(),
    },
  })
}

export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 403,
    body: {
      error: faker.random.words(),
    },
  })
}

export const mockOk = (url: RegExp, body: object): void => {
  cy.intercept('POST', url, {
    statusCode: 200,
    body,
  }).as('request')
}
