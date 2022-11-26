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
  const mockedAxios = mockAxios()
  const sut = new AxiosHttpClient()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response on axios.post', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      const response = await sut.post(request)

      expect(response).toEqual({
        statusCode: mockedAxios.post.mock.results[0].value.status,
        body: mockedAxios.post.mock.results[0].value.data,
      })
    })

    test('Should return the error on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() })

      const response = await sut.post(mockPostRequest())

      expect(response).toEqual({
        statusCode: mockedAxios.post.mock.results[0].value.status,
        body: mockedAxios.post.mock.results[0].value.data,
      })
    })
  })
})
