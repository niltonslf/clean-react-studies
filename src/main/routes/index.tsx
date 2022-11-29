import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

import LoginFactory from '@/main/factories/pages/login/login-factory'
import SignUpFactory from '@/main/factories/pages/signup/signup-factory'
import SurveyList from '@/presentation/pages/SurveyList'

const Routes: React.FC = () => {
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
