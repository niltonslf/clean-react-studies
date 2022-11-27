import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

import SurveyList from '../pages/SurveyList'

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
        <Route path='/survey' element={<SurveyList />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
