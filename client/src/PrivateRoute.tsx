import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/admin/login'} />
        )
      }
    />
  )
}

export default PrivateRoute
