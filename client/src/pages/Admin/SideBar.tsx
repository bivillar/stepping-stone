import React, { FC, useState, useDebugValue, useEffect } from 'react'
import { History } from 'history'

import { PeopleIcon, UploadIcon } from './Icons'

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
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => setUrl(window.location.pathname), [])

  const goto = (url: string) => {
    console.log(url)
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
          className={url === '/admin/list' ? 'selected' : ''}
          onClick={() => goto('/admin/list')}>
          <MenuItem
            icon={<PeopleIcon />}
            label="Gerenciar Usuários"
            isOpen={isOpen}
          />
        </li>
        <li
          id="item"
          className={url === '/admin/upload' ? 'selected' : ''}
          onClick={() => goto('/admin/upload')}>
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
