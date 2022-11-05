import { faker } from '@faker-js/faker'
import axios from 'axios'

import { HttpPostParams } from '@/data/protocols/http'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = { data: faker.datatype.json(), status: faker.random.numeric() }

mockAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url as any as string,
  body: faker.datatype.json
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)

    expect(mockAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    const response = await sut.post(request)

    expect(response).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})

export {}
