import './login-styles.scss'

import { Input, Submit, Loader } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Welcome back, #User</h1>
          <p>Please, enter your account information.</p>
        </header>

        <form className='login-form'>
          <Input type='email' name='email' placeholder='Type your mail' />
          <Input type='password' placeholder='Type your password' />
          <Submit>Login</Submit>
          <a href='#'>Don't have an account? Create one here</a>
        </form>
        <Loader />
      </article>
      <div className='container-illustration'></div>
    </section>
  )
}

Login.displayName = 'Login'
export default Login
