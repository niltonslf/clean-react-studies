import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Navigate to='/login' />
}
PrivateRoute.displayName = 'PrivateRoute'
