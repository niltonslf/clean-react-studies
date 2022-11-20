import './signup.styles.scss'

import React from 'react'
import { Link } from 'react-router-dom'

import { Input, Submit, FormStatus } from '@/presentation/components'
import { FormContext } from '@/presentation/components/Form/context'

interface LoginProps {
  any?: any
}

const SignUp: React.FC<LoginProps> = () => {
  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Create an account</h1>
          <p>Please, fill up the form bellow:</p>
        </header>

        <FormContext.Provider value={{ state: {}, setState: () => {} }}>
          <form className='login-form'>
            <div className='form-group'>
              <Input required type='name' name='name' placeholder='Type your name' />
            </div>

            <div className='form-group'>
              <Input required type='email' name='email' placeholder='Type your mail' />
            </div>

            <div className='form-group'>
              <Input name='password' required type='password' placeholder='Type your password' />
            </div>

            <div className='form-group'>
              <Input
                name='password-confirmation'
                required
                type='password'
                placeholder='Confirme your password'
              />
            </div>

            <Submit>Login</Submit>
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
