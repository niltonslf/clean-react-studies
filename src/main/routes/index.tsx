import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter'
import { LoginFactory, SignUpFactory, SurveyFactory } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/context'

const Routes: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Router>
          <Route path='/login' element={<LoginFactory />} />
          <Route path='/signup' element={<SignUpFactory />} />
          <Route path='/' element={<PrivateRoute component={<SurveyFactory />} />} />
        </Router>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Routes
