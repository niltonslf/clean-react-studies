import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import LoginFactory from '@/main/factories/pages/login/login-factory'
import SignUpFactory from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/context'
import SurveyList from '@/presentation/pages/SurveyList'

const Routes: React.FC = () => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <BrowserRouter>
        <Router>
          <Route path='/login' element={<LoginFactory />} />
          <Route path='/signup' element={<SignUpFactory />} />
          <Route path='/survey' element={<SurveyList />} />
        </Router>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Routes
