import axios from 'axios'
import { expect, describe, test, Mocked, vi } from 'vitest'

import { mockGetRequest, mockPostRequest } from '@/data/test'
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

      const httpResponse = await sut.post(mockPostRequest())
      const axiosResponse = await mockedAxios.post.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.response.status,
        body: axiosResponse.response.data,
      })
    })
  })

  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { headers: request.headers })
    })

    test('Should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut()

      const httpResponse = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })
    })

    test('Should return the error on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse(),
      })

      const httpResponse = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.response.status,
        body: axiosResponse.response.data,
      })
    })
  })
})
