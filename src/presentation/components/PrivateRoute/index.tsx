import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { ApiContext } from '@/presentation/context'

type PrivateRouteProps = {
  component: React.ReactElement
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const { getCurrentAccount } = useContext(ApiContext)

  const account = getCurrentAccount ? getCurrentAccount() : null

  if (account?.accessToken) return component
  return <Navigate to='/login' />
}
PrivateRoute.displayName = 'PrivateRoute'
