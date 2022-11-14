import { useContext } from 'react'

import { Loader } from '@/presentation/components'
import { FormContext, FormContextProps } from '@/presentation/components/Form/context'

const FormStatus = () => {
  const { state } = useContext(FormContext) as FormContextProps
  const { isLoading, requestError } = state

  return (
    <div data-testid='error-wrap' className='form-status'>
      {isLoading && <Loader />}
      {!isLoading && requestError && (
        <div data-testid='main-error' className='form-error'>
          {requestError}
        </div>
      )}
    </div>
  )
}

export default FormStatus
