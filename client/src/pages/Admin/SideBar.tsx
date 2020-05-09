import React, { FC, useState, useEffect, ReactElement } from 'react'
import { History } from 'history'

import { AdminPagesEnum } from '../../constants'
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

  const goto = (url: string) => {
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
        <li id="item" onClick={() => goto('/admin/list')}>
          <MenuItem
            icon={<PeopleIcon />}
            label="Gerenciar Usuários"
            isOpen={isOpen}
          />
        </li>
        <li id="item" onClick={() => goto('/admin/upload')}>
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
  setPage: (page: AdminPagesEnum) => void
  open: () => void
  history: History
}

export default SideBar
