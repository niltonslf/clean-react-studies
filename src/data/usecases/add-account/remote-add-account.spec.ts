import { describe, expect, test } from 'vitest'

import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { mockAddAccountParams } from '@/domain/test/mock-add-account'
import { AddAccountParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return { sut, httpPostClientSpy }
}

describe('RemoteAddAccount', () => {
  test('should call HttpPostClient with correct values', () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    sut.add(mockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })
})
