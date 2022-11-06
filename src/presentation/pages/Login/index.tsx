import './login-styles.scss'

import { Input, Submit, FormStatus } from '@/presentation/components'
import { withFormProvider } from '@/presentation/components/Form/context'

const Login: React.FC = () => {
  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Welcome back, #User</h1>
          <p>Please, enter your account information.</p>
        </header>

        <form className='login-form'>
          <Input
            data-testid='email'
            required
            type='email'
            name='email'
            placeholder='Type your mail'
          />
          <Input data-testid='password' required type='password' placeholder='Type your password' />
          <Submit disabled>Login</Submit>
          <a href='#'>Don't have an account? Create one here</a>
        </form>
        <FormStatus />
      </article>
      <div className='container-illustration'></div>
    </section>
  )
}

Login.displayName = 'Login'
export default withFormProvider(Login)
