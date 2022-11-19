import { faker } from '@faker-js/faker'

import { AddAccountParams } from '../usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.name.fullName() as any as string,
    email: faker.internet.email as any as string,
    password,
    passwordConfirmation: password,
  }
}
