import './login-styles.scss'

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { Input, Submit, FormStatus } from '@/presentation/components'
import { StateProps, FormContext } from '@/presentation/components/Form/context'
import { ApiContext } from '@/presentation/context'
import { Validation } from '@/presentation/protocols/validation'

interface LoginProps {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState<StateProps>({
    isLoading: false,
    requestError: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading) return

      setState(() => ({ ...state, isLoading: true }))
      const account = await authentication.auth({ email: state.email, password: state.password })

      if (account && setCurrentAccount) await setCurrentAccount(account)

      navigate('/')
    } catch (error: any) {
      setState((state) => ({ ...state, isLoading: false, requestError: error.message }))
    }
  }

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }

    setState((state) => ({
      ...state,
      emailError: validation.validate('email', formData),
      passwordError: validation.validate('password', formData),
    }))
  }, [state.email, state.password])

  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Welcome back, #User</h1>
          <p>Please, enter your account information.</p>
        </header>

        <FormContext.Provider value={{ state, setState }}>
          <form data-testid='form' className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <Input
                data-testid='email'
                required
                type='email'
                name='email'
                placeholder='Type your mail'
              />
              {!state.isLoading && state.emailError && (
                <div data-testid='email-error' className='form-error'>
                  {state.emailError}
                </div>
              )}
            </div>

            <div className='form-group'>
              <Input
                name='password'
                data-testid='password'
                required
                type='password'
                placeholder='Type your password'
              />

              {!state.isLoading && state.passwordError && (
                <div data-testid='password-error' className='form-error'>
                  {state.passwordError}
                </div>
              )}
            </div>
            <Submit
              disabled={
                (!state.email && !state.password) || (!!state.emailError && !!state.passwordError)
              }
            >
              Login
            </Submit>
            <Link to='/signup' data-testid='register'>
              Don't have an account? Create one here
            </Link>
            <FormStatus />
          </form>
        </FormContext.Provider>
      </article>
      <div className='container-illustration'></div>
    </section>
  )
}

Login.displayName = 'Login'
export default Login
