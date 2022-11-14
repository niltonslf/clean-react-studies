import Routes from '../presentation/routes'
import '../presentation/styles/global-styles.scss'
import LoginFactory from './factories/pages/login/login-factory'

function App() {
  return <Routes LoginFactory={LoginFactory} />
}

export default App
