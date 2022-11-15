import axios from 'axios'
import { Mocked, vi } from 'vitest'

export const mockHttpResponse = (): any => ({
  data: 'any_data',
  status: 200,
})

export const mockAxios = (): Mocked<typeof axios> => {
  const mockAxios = axios as Mocked<typeof axios>
  mockAxios.create = vi.fn()
  mockAxios.create.mockReturnValue(mockAxios)

  mockAxios.post.mockResolvedValue(mockHttpResponse())

  return mockAxios
}
