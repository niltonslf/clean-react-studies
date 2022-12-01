import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { ApiContext } from '@/presentation/context'

type PrivateRouteProps = {
  children: React.ReactElement
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { getCurrentAccount } = useContext(ApiContext)

  const account = getCurrentAccount ? getCurrentAccount() : null

  if (account?.accessToken) return children
  return <Navigate to='/login' />
}
PrivateRoute.displayName = 'PrivateRoute'
