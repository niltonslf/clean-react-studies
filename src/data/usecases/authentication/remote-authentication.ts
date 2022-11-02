import { faker } from '@faker-js/faker'
import { AccountModel } from '@/domain/models/account-model'
import {
  Authentication,
  AuthenticationParams
} from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url, body: params })

    const accessToken = faker.random.alphaNumeric as any as string

    return await Promise.resolve({ accessToken })
  }
}
