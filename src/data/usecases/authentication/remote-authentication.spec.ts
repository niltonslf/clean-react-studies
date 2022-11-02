import { faker } from '@faker-js/faker'

import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)
    sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParam = mockAuthentication()
    sut.auth(authenticationParam)

    expect(httpPostClientSpy.body).toEqual(authenticationParam)
  })

  test('should throw invalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = { statusCode: HttpStatusCode.unauthorized }

    const authenticationParam = mockAuthentication()
    const promise = sut.auth(authenticationParam)

    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})

export {}
