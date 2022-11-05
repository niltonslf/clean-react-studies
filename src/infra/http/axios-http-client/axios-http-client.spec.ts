import { faker } from '@faker-js/faker'
import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url and verb', async () => {
    const url = faker.internet.url as any as string
    const sut = makeSut()
    await sut.post({ url })

    expect(mockAxios.post).toHaveBeenCalledWith(url)
  })
})

export {}
