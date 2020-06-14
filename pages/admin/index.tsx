import React, { FC, useContext, useEffect, useState } from 'react'
import Router from 'next/router'

import Loading from '../../components/Loading'

const Admin = ({ currentUser }: any) => {
  useEffect(() => {
    if (!currentUser) {
      Router.push('/admin/login')
    } else {
      Router.push('/admin/configs')
    }
  }, [currentUser])

  return <Loading />
}

export default Admin
