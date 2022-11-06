import { createContext } from 'react'

export type StateProps = {
  isLoading: boolean
  email: string
  password: string
  mainError: string
}

export interface FormContextProps {
  state: StateProps
  setState: (value: any) => void
}

export const FormContext = createContext<FormContextProps | null>(null)
FormContext.displayName = 'FormContext'
