import React, { FC, useState, useDebugValue, useEffect } from 'react'
import { History } from 'history'

import { PeopleIcon, UploadIcon } from './Icons'
import { AdminPagesEnum } from '../../constants'

const MenuItem: FC<{ icon: any; label: string; isOpen: boolean }> = ({
  icon,
  label,
  isOpen,
}) => (
  <div className="flex items-center pl10 z-2">
    <span className={isOpen ? '' : 'moveRight'}>{icon}</span>
    <span className={`label ${isOpen ? 'fadeIn' : 'fadeOut'}`}>{label}</span>
  </div>
)

const SideBar: FC<Props> = ({ isOpen, open, history }) => {
  const className = isOpen ? 'adminSidebar--open' : ''
  const [url, setUrl] = useState<AdminPagesEnum | null>(null)

  useEffect(() => setUrl(window.location.pathname as AdminPagesEnum), [])

  const goto = (url: AdminPagesEnum) => {
    setUrl(url)
    history.push(url)
  }

  const handleMenuClick = (event: any) => {
    if (['adminSideBar', 'adminMenu'].includes(event.target.id)) {
      open()
    }
  }

  return (
    <div
      id="adminSideBar"
      onClick={handleMenuClick}
      className={`adminSidebar ${className}`}>
      <ul className="adminMenu" id="adminMenu">
        <li
          id="item"
          className={url === AdminPagesEnum.List ? 'selected' : ''}
          onClick={() => goto(AdminPagesEnum.List)}>
          <MenuItem
            icon={<PeopleIcon />}
            label="Gerenciar Usuários"
            isOpen={isOpen}
          />
        </li>
        <li
          id="item"
          className={url === AdminPagesEnum.Upload ? 'selected' : ''}
          onClick={() => goto(AdminPagesEnum.Upload)}>
          <MenuItem
            icon={<UploadIcon />}
            label="Fazer Upload de novos dados"
            isOpen={isOpen}
          />
        </li>
      </ul>

      <div>
        <span className="shape"></span>
        <span className="shape"></span>
      </div>
    </div>
  )
}

interface Props {
  isOpen: boolean
  open: () => void
  history: History
}

export default SideBar
