import { Routes as Router, Route, BrowserRouter } from 'react-router-dom'

interface AppProps {
  LoginFactory: React.FC
}

const Routes: React.FC<AppProps> = ({ LoginFactory }) => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/login' element={<LoginFactory />} />
      </Router>
    </BrowserRouter>
  )
}

export default Routes
