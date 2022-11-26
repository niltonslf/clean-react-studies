import { faker } from '@faker-js/faker'

import * as Helper from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockOk = (): void => Helper.mockOk(/login/, { accessToken: faker.datatype.uuid() })
