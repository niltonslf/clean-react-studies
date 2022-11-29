import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

type ApiProps = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export const ApiContext = createContext<ApiProps>({})
