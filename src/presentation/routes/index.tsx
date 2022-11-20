import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

import { SignUp } from '@/presentation/pages'

interface AppProps {
  LoginFactory: React.FC
}

const Routes: React.FC<AppProps> = ({ LoginFactory }) => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/login' element={<LoginFactory />} />
        <Route path='/signup' element={<SignUp />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
