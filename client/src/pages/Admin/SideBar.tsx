import React, { FC, useState, useEffect } from 'react'
import { History } from 'history'

import { AdminPagesEnum } from '../../constants'

const SideBar: FC<Props> = ({ isOpen, open, history }) => {
  const className = isOpen ? 'adminSidebar--open' : ''

  return (
    <div onClick={open} className={`adminSidebar ${className}`}>
      {/* <div className="adminMenu">Hello</div> */}
      <div onClick={() => history.push('/admin/list')}>LIST</div>
      <div onClick={() => history.push('/admin/upload')}>UPLOAD</div>
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
