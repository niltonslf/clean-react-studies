import axios from 'axios'
import { expect, describe, test, Mocked, vi } from 'vitest'

import { mockPostRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/test'

import { AxiosHttpClient } from './axios-http-client'

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    const response = await sut.post(request)

    expect(response).toEqual({
      statusCode: mockedAxios.post.mock.results[0].value.status,
      body: mockedAxios.post.mock.results[0].value.data,
    })
  })

  test('Should return the correct status code and body on failure', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() })

    const response = await sut.post(mockPostRequest())

    expect(response).toEqual({
      statusCode: mockedAxios.post.mock.results[0].value.status,
      body: mockedAxios.post.mock.results[0].value.data,
    })
  })
})
