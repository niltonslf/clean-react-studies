import './login-styles.scss'

import React, { useEffect, useState } from 'react'

import { Authentication } from '@/domain/usecases'
import { Input, Submit, FormStatus } from '@/presentation/components'
import { StateProps, FormContext } from '@/presentation/components/Form/context'
import { Validation } from '@/presentation/protocols/validation'

interface LoginProps {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    requestError: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading) return

      setState(() => ({ ...state, isLoading: true }))
      await authentication.auth({ email: state.email, password: state.password })
    } catch (error: any) {
      setState((state) => ({ ...state, isLoading: false, requestError: error.message }))
    }
  }

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Welcome back, #User</h1>
          <p>Please, enter your account information.</p>
        </header>

        <FormContext.Provider value={{ state, setState }}>
          <form className='login-form' onSubmit={handleSubmit}>
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
            <Submit>Login</Submit>
            <a href='#'>Don't have an account? Create one here</a>
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
