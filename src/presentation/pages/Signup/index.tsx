import './signup.styles.scss'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Input, Submit, FormStatus } from '@/presentation/components'
import { FormContext } from '@/presentation/components/Form/context'

interface LoginProps {
  any?: any
}

const SignUp: React.FC<LoginProps> = () => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
  })

  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Create an account</h1>
          <p>Please, fill up the form bellow:</p>
        </header>

        <FormContext.Provider value={{ state, setState }}>
          <form className='login-form'>
            <div className='form-group' data-testid='name-group'>
              <Input
                data-testid='name'
                required
                type='name'
                name='name'
                placeholder='Type your name'
              />
              {!state.isLoading && state.name && (
                <div data-testid='field-name-error' className='form-error'>
                  {state.name}
                </div>
              )}
            </div>

            <div className='form-group' data-testid='email-group'>
              <Input
                data-testid='email'
                required
                type='email'
                name='email'
                placeholder='Type your mail'
              />
              {!state.isLoading && state.email && (
                <div data-testid='field-email-error' className='form-error'>
                  {state.email}
                </div>
              )}
            </div>

            <div className='form-group' data-testid='password-group'>
              <Input
                data-testid='password'
                name='password'
                required
                type='password'
                placeholder='Type your password'
              />
              {!state.isLoading && state.password && (
                <div data-testid='field-password-error' className='form-error'>
                  {state.password}
                </div>
              )}
            </div>

            <div className='form-group' data-testid='password-confirmation-group'>
              <Input
                data-testid='password-confirmation'
                name='password-confirmation'
                required
                type='password'
                placeholder='Confirme your password'
              />
              {!state.isLoading && state.passwordConfirmation && (
                <div data-testid='field-password-confirmation-error' className='form-error'>
                  {state.passwordConfirmation}
                </div>
              )}
            </div>

            <Submit data-testid='submit'>Login</Submit>
            <Link to='/login' className='back-to-login'>
              Voltar para login
            </Link>
            <FormStatus />
          </form>
        </FormContext.Provider>
      </article>
      <div className='container-illustration'></div>
    </section>
  )
}

SignUp.displayName = 'SignUp'
export default SignUp
