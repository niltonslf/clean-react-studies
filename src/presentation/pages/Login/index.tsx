import './login-styles.scss'

import { useEffect, useState } from 'react'

import { Input, Submit, FormStatus } from '@/presentation/components'
import { StateProps, FormContext } from '@/presentation/components/Form/context'
import { Validation } from '@/presentation/protocols/validation'

interface LoginProps {
  validation: Validation
}

const Login: React.FC<LoginProps> = ({ validation }) => {
  const initialState = { isLoading: false, mainError: '', email: '', password: '' }
  const [state, setState] = useState<StateProps>(initialState)

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])

  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Welcome back, #User</h1>
          <p>Please, enter your account information.</p>
        </header>

        <FormContext.Provider value={{ state, setState }}>
          <form className='login-form'>
            <Input
              data-testid='email'
              required
              type='email'
              name='email'
              placeholder='Type your mail'
            />
            <Input
              name='password'
              data-testid='password'
              required
              type='password'
              placeholder='Type your password'
            />
            <Submit disabled>Login</Submit>
            <a href='#'>Don't have an account? Create one here</a>
          </form>
          <FormStatus />
        </FormContext.Provider>
      </article>
      <div className='container-illustration'></div>
    </section>
  )
}

Login.displayName = 'Login'
export default Login
