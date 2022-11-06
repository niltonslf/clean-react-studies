import axios from 'axios'

import { faker } from '@faker-js/faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockAxios = axios as jest.Mocked<typeof axios>
  mockAxios.post.mockResolvedValue({
    data: faker.datatype.json(),
    status: faker.random.numeric(),
  })

  return mockAxios
}
