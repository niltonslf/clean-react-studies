import { makeRemoteAddAccountFactory } from '@/main/factories/usecases'
import { SignUp } from '@/presentation/pages'

import { makeSignUpValidationFactory } from './signup-validation-factory'

interface SignUpFactoryProps {
  any?: any
}

const SignUpFactory: React.FC<SignUpFactoryProps> = () => {
  return (
    <SignUp addAccount={makeRemoteAddAccountFactory()} validation={makeSignUpValidationFactory()} />
  )
}
SignUpFactory.displayName = 'SignUpFactory'

export default SignUpFactory
