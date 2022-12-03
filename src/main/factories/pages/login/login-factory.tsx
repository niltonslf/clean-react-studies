/* eslint-disable max-len */
import { makeRemoteAuthenticationFactory } from '@/main/factories/usecases'
import Login from '@/presentation/pages/Login'

import { makeLoginValidationFactory } from './login-validation-factory'

interface LoginFactoryProps {
  any?: any
}

export const LoginFactory: React.FC<LoginFactoryProps> = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticationFactory()}
      validation={makeLoginValidationFactory()}
    />
  )
}
LoginFactory.displayName = 'LoginFactory'
