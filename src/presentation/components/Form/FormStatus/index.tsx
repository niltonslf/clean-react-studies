import { useContext } from 'react'

import { Loader } from '@/presentation/components'
import { FormContext, FormContextProps } from '@/presentation/components/Form/context'

const FormStatus = () => {
  const { state } = useContext(FormContext) as FormContextProps
  const { isLoading, requestError } = state

  return (
    <div data-testid='error-wrap'>
      {isLoading && <Loader />}
      {requestError && <span data-testid='main-error'>{requestError}</span>}
    </div>
  )
}

export default FormStatus
