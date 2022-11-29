import { faker } from '@faker-js/faker'

import * as Helper from '../support/http-mocks'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/)

export const mockInvalidData = (): void =>
  Helper.mockOk(/signup/, { invalid: faker.datatype.uuid() })

export const mockOk = (): void =>
  Helper.mockOk(/signup/, { accessToken: faker.datatype.uuid(), name: faker.name.fullName() })
