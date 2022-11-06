import { useContext } from 'react'

import { Loader } from '@/presentation/components'
import { FormContext } from '@/presentation/components/Form/context'

const FormStatus = () => {
  const { isLoading, errorMessage } = useContext(FormContext)

  return (
    <div data-testid='error-wrap'>
      {isLoading && <Loader />}
      {errorMessage && <span>Error message</span>}
    </div>
  )
}

export default FormStatus
