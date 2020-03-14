import React, { useContext } from 'react'
import { AuthContext } from './Auth'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={routerProps =>
        !!currentUser ? (
          <RouteComponent {...routerProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }></Route>
  )
}

export default PrivateRoute
