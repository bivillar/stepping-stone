import React, { FC, useContext, useEffect, useState } from 'react'
import Firebase from '../../utils/base'
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

Admin.getInitialProps = async () => {
  const base = new Firebase()
  const currentUser = await base.getCurrentUser()
  return { currentUser }
}

export default Admin
