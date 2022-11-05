import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

import Login from '@/presentation/pages/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
