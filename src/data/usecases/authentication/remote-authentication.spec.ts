import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy)
    systemUnderTest.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})

export {}
