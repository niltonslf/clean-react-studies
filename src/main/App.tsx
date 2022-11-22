import '../presentation/styles/global-styles.scss'
import Routes from '../presentation/routes'
import LoginFactory from './factories/pages/login/login-factory'
import SignUpFactory from './factories/pages/signup/signup-factory'

function App() {
  return <Routes LoginFactory={LoginFactory} SignUpFactory={SignUpFactory} />
}

export default App
