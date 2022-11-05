import { faker } from '@faker-js/faker'

import { AccountModel } from '../models'
import { AuthenticationParams } from '../usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email as any as string,
  password: faker.internet.password as any as string
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
