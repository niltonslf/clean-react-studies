import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

interface AppProps {
  LoginFactory: React.FC
  SignUpFactory: React.FC
}

const Routes: React.FC<AppProps> = ({ LoginFactory, SignUpFactory }) => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/login' element={<LoginFactory />} />
        <Route path='/signup' element={<SignUpFactory />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
