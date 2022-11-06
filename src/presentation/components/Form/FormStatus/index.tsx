import { useContext } from 'react'

import { Loader } from '@/presentation/components'
import { FormContext, FormContextProps } from '@/presentation/components/Form/context'

const FormStatus = () => {
  const { state } = useContext(FormContext) as FormContextProps
  const { isLoading, mainError } = state

  return (
    <div data-testid='error-wrap'>
      {isLoading && <Loader />}
      {mainError && <span>{mainError}</span>}
    </div>
  )
}

export default FormStatus
