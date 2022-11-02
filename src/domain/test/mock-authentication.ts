import { faker } from '@faker-js/faker'
import { AuthenticationParams } from '../usecases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email as any as string,
  password: faker.internet.password as any as string
})
