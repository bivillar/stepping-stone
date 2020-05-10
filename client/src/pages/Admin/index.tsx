import React, { FC, useState, useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { History } from 'history'

import { Button } from 'react-bootstrap'

import { AdminPagesEnum } from '../../constants'
import { AuthContext } from '../../Auth'
import PrivateRoute from '../../PrivateRoute'
import SignUp from './SignUp'
import Login from './Login'
import Upload from './Upload'
import UserList from './UserList'
import SideBar from './SideBar'
import TopBar from './TopBar'

const Admin: FC<Props> = ({ history, children }) => {
  const { currentUser } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [page, setPage] = useState<AdminPagesEnum>(AdminPagesEnum.Upload)
  const [loaded, setLoaded] = useState<boolean>(false)

  if (history.location.pathname == '/admin') history.push('/admin/upload')

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
          setPage={setPage}
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
          <Route path="/admin/login" component={Login} />
          <Route path="/admin/signup" component={SignUp} />
          <PrivateRoute
            currentUser={currentUser}
            path="/admin/upload"
            component={Upload}
          />
          <PrivateRoute
            currentUser={currentUser}
            path="/admin/list"
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
