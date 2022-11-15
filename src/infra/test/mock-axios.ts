import axios from 'axios'
import { Mocked } from 'vitest'

export const mockAxios = (): Mocked<typeof axios> => {
  const mockAxios = axios as Mocked<typeof axios>

  mockAxios.post.mockResolvedValue({
    data: 'any_data',
    status: 200,
  })

  return mockAxios
}
