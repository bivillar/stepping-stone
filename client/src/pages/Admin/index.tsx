import React, { FC, useState, useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { History } from 'history'

import { AuthContext } from '../../Auth'
import PrivateRoute from '../../PrivateRoute'
import SignUp from './SignUp'
import Login from './Login'
import Upload from './Upload'
import UserList from './UserList'
import SideBar from './SideBar'
import TopBar from './TopBar'
import { AdminPagesEnum } from '../../constants'

const Admin: FC<Props> = ({ history }) => {
  const { currentUser } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  if (history.location.pathname === '/admin')
    history.push(AdminPagesEnum.Upload)

  useEffect(() => {
    setTimeout(() => {
      if (currentUser) setLoaded(true)
    }, 200)
  }, [currentUser])

  return (
    <div
      className={`${loaded ? '' : 'preload'} ${
        currentUser ? 'admin' : 'adminLogin '
      }`}>
      {currentUser && (
        <SideBar
          history={history}
          isOpen={isOpen}
          open={() => setIsOpen(!isOpen)}
        />
      )}
      <div
        className={
          currentUser
            ? `adminContent ${isOpen ? 'adminContent--open' : ''}`
            : ''
        }>
        {currentUser && <TopBar history={history} />}
        <Switch>
          <Route path={AdminPagesEnum.Login} component={Login} />
          <Route path={AdminPagesEnum.SignUp} component={SignUp} />
          <PrivateRoute
            currentUser={currentUser}
            path={AdminPagesEnum.Upload}
            component={Upload}
          />
          <PrivateRoute
            currentUser={currentUser}
            path={AdminPagesEnum.List}
            component={UserList}
          />
        </Switch>
      </div>
    </div>
  )
}

interface Props {
  history: History
}

export default Admin
