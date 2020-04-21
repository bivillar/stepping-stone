import React, { FC, useState, useContext } from 'react'
import Upload from './Upload'
import Container from '../../components/Container'
import { History } from 'history'
import UserList from './UserList'
import { AuthContext } from '../../Auth'
import SideBar from './SideBar'

const Admin: FC<Props> = ({ history }) => {
  const { currentUser } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="admin">
      <SideBar isOpen={isOpen} open={() => setIsOpen(!isOpen)} />
      <div className={`adminContent ${isOpen ? 'adminContent--open' : ''}`}>
        <div className="w-50 flex flex-column">
          <Upload history={history} />
          {currentUser?.isAdmin && <UserList />}
        </div>
      </div>
    </div>
  )
}

interface Props {
  history: History
}

export default Admin
