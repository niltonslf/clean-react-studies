import Loader from '@/presentation/components/Loader'
import './login-styles.scss'

const Login: React.FC = () => {
  return (
    <section className='container'>
      <article className='container-content'>
        <header>
          <h1 className='container-content-title'>Welcome back, #User</h1>
          <p>Please, enter your account information.</p>
        </header>

        <form className='login-form'>
          <input type='email' name='email' placeholder='Type your mail' className='form-control' />
          <input type='password' placeholder='Type your password' className='form-control' />
          <button type='submit' className='form-button'>
            Login
          </button>
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
