import { faker } from '@faker-js/faker'
import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(async () => await Promise.resolve())
}))
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url', async () => {
    const url = faker.internet.url as any as string
    const sut = new AxiosHttpClient()
    await sut.post({ url })

    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})

export {}
