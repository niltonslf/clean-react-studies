import { GetStorage } from '@/data/protocols/cache'
import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any {
    const response = localStorage.getItem(key) as string
    return JSON.parse(response)
  }
}
