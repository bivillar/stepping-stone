import React, { FC, useState, useEffect } from 'react'
import Router from 'next/router'
import {
  BsLayoutTextWindowReverse as TextIcon,
  BsPeople as PeopleIcon,
} from 'react-icons/bs'
import { USERS_URL, CONFIGS_URL } from '../utils/constants'

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

const SideBar: FC<Props> = ({ isOpen, open }) => {
  const className = isOpen ? 'adminSidebar--open' : ''
  const [url, setUrl] = useState<string | null>(null)

  useEffect(
    () => window && window.location && setUrl(window.location.pathname),
    []
  )

  const goto = (path: string) => {
    if (path === url) return
    setUrl(path)
    Router.push(path)
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
          className={url === USERS_URL ? 'selected' : ''}
          onClick={() => goto(USERS_URL)}>
          <MenuItem
            icon={<PeopleIcon />}
            label="Gerenciar Usuários"
            isOpen={isOpen}
          />
        </li>
        <li
          id="item"
          className={url === CONFIGS_URL ? 'selected' : ''}
          onClick={() => goto(CONFIGS_URL)}>
          <MenuItem
            icon={<TextIcon />}
            label="Gerenciar Posts"
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
}

export default SideBar
