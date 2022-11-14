import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import Login from '@/presentation/pages/Login'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

interface LoginFactoryProps {
  any?: any
}

const LoginFactory: React.FC<LoginFactoryProps> = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const authentication = new RemoteAuthentication(url, new AxiosHttpClient())
  const validation = ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').min(5).required().build(),
  ])

  return <Login authentication={authentication} validation={validation} />
}
LoginFactory.displayName = 'LoginFactory'

export default LoginFactory
