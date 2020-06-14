import React, { FC, useState, useEffect } from 'react'
import Router from 'next/router'

import TopBar from './Topbar'
import SideBar from './SideBar'
import { useUser } from '../utils/firebase/useUser'
import Loading from './Loading'
import { LOGIN_URL } from '../utils/constants'

const AdminContainer: FC<Props> = ({ children, hasPermission }) => {
  const { currentUser } = useUser()
  const [isRendered, setIsRendered] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    setIsRendered(true)
  }, [currentUser])

  if (!isRendered || !currentUser) return <Loading />

  return (
    <>
      <SideBar isOpen={isOpen} open={() => setIsOpen(!isOpen)} />
      <div className={`adminContent ${isOpen ? 'adminContent--open' : ''}`}>
        <TopBar />
        {hasPermission ? (
          children
        ) : (
          <div className="adminContainer">
            <h1>Para ter acesso, você precisa pedir à um dos admins.</h1>
          </div>
        )}
      </div>
    </>
  )
}

interface Props {
  hasPermission?: boolean
}

export default AdminContainer
