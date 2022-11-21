import { createContext } from 'react'

export type StateProps = {
  isLoading: boolean
  email: string
  password: string
  emailError: string | null
  passwordError: string | null
  requestError: string
}

export interface FormContextProps {
  state: any
  setState: (value: any) => void
}

export const FormContext = createContext<FormContextProps | null>(null)
FormContext.displayName = 'FormContext'
