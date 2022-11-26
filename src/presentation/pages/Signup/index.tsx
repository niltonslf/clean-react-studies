import './signup.styles.scss'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UnexpectedError } from '@/domain/errors'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Input, Submit, FormStatus } from '@/presentation/components'
import { FormContext } from '@/presentation/components/Form/context'
import { Validation } from '@/presentation/protocols/validation'

interface LoginProps {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<LoginProps> = ({ validation, addAccount, saveAccessToken }) => {
  const navigate = useNavigate()

  const [state, setState] = useState({
    isLoading: false,
    requestError: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
  })

  const isDisabled =
    !!state.emailError ||
    !!state.passwordError ||
    !!state.passwordConfirmationError ||
    !!state.nameError

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { nameError, emailError, passwordConfirmationError, passwordError } = state

    try {
      if (state.isLoading || nameError || emailError || passwordConfirmationError || passwordError)
        return

      setState((state) => ({ ...state, isLoading: true }))
      const account = await addAccount.add({
        email: state.email,
        name: state.name,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      })

      if (account?.accessToken) await saveAccessToken.save(account?.accessToken)
      else throw new UnexpectedError()

      navigate('/')
    } catch (error: any) {
      setState((state) => ({ ...state, isLoading: false, requestError: error.message }))
    }
  }

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    setState((state) => ({
      ...state,
      nameError: validation.validate('name', formData) ?? '',
      emailError: validation.validate('email', formData) ?? '',
      passwordError: validation.validate('password', formData) ?? '',
      passwordConfirmationError: validation.validate('passwordConfirmation', formData) ?? '',
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Create an account</h1>
          <p>Please, fill up the form bellow:</p>
        </header>

        <FormContext.Provider value={{ state, setState }}>
          <form data-testid='form' className='login-form' onSubmit={handleSubmit}>
            <div className='form-group' data-testid='name-group'>
              <Input data-testid='name' type='name' name='name' placeholder='Type your name' />
              {!state.isLoading && state.nameError && (
                <div className='form-error' data-testid='name-error'>
                  {state.nameError}
                </div>
              )}
            </div>

            <div className='form-group' data-testid='email-group'>
              <Input data-testid='email' type='email' name='email' placeholder='Type your mail' />
              {!state.isLoading && state.emailError && (
                <div className='form-error' data-testid='email-error'>
                  {state.emailError}
                </div>
              )}
            </div>

            <div className='form-group' data-testid='password-group'>
              <Input
                data-testid='password'
                name='password'
                type='password'
                placeholder='Type your password'
              />
              {!state.isLoading && state.passwordError && (
                <div className='form-error' data-testid='password-error'>
                  {state.passwordError}
                </div>
              )}
            </div>

            <div className='form-group' data-testid='password-confirmation-group'>
              <Input
                data-testid='passwordConfirmation'
                name='passwordConfirmation'
                type='password'
                placeholder='Confirme your password'
              />
              {!state.isLoading && state.passwordConfirmationError && (
                <div className='form-error' data-testid='password-confirmation-error'>
                  {state.passwordConfirmationError}
                </div>
              )}
            </div>

            <Submit disabled={isDisabled} data-testid='submit'>
              Register
            </Submit>
            <Link to='/login' data-testid='login-link' className='back-to-login'>
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
