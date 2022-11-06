import React, { createContext, useState } from 'react'

export type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const initialState = { isLoading: false, errorMessage: '' }

export const FormContext = createContext<StateProps>(initialState)
FormContext.displayName = 'FormContext'

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state] = useState<StateProps>(initialState)

  return <FormContext.Provider value={state}>{children}</FormContext.Provider>
}

export const withFormProvider =
  <T,>(Component: React.ComponentType<T>) =>
  (props: React.PropsWithChildren<T>) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    )
  }
