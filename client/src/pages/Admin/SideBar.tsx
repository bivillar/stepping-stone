import React, { FC, useState, useEffect } from 'react'

const SideBar: FC<Props> = ({ isOpen, open }) => {
  const className = isOpen ? 'adminSidebar--open' : ''

  return (
    <div onClick={open} className={`adminSidebar ${className}`}>
      {/* <div className="adminMenu">Hello</div> */}
      <span className="shape"></span>
      <span className="shape"></span>
    </div>
  )
}

interface Props {
  isOpen: boolean
  open: () => void
}

export default SideBar
