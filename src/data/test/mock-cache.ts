import { faker } from '@faker-js/faker'

import { GetStorage } from '../protocols/cache'

export class GetStorageSpy implements GetStorage {
  key: string
  value = JSON.parse(faker.datatype.json())

  get(key: string): any {
    this.key = key
    return this.value
  }
}
