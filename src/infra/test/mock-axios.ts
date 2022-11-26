import axios from 'axios'
import { Mocked, vi } from 'vitest'

import { faker } from '@faker-js/faker'

export const mockHttpResponse = (): any => ({
  data: 'any_data',
  status: faker.internet.httpStatusCode,
})

export const mockAxios = (): Mocked<typeof axios> => {
  const mockAxios = axios as Mocked<typeof axios>

  mockAxios.create = vi.fn()
  mockAxios.create.mockReturnValue(mockAxios)

  mockAxios.post.mockResolvedValue(mockHttpResponse())
  mockAxios.get.mockResolvedValue(mockHttpResponse())

  return mockAxios
}
