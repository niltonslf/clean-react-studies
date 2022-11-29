/* eslint-disable max-len */
import { makeRemoteAuthenticationFactory } from '@/main/factories/usecases'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import Login from '@/presentation/pages/Login'

import { makeLoginValidationFactory } from './login-validation-factory'

interface LoginFactoryProps {
  any?: any
}

const LoginFactory: React.FC<LoginFactoryProps> = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticationFactory()}
      validation={makeLoginValidationFactory()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
LoginFactory.displayName = 'LoginFactory'

export default LoginFactory
