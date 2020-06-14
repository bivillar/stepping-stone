import React, { FC, useContext, useEffect, useState } from 'react'
import Router from 'next/router'

import Loading from '../../components/Loading'
import { useUser } from '../../utils/firebase/useUser'
import { LOGIN_URL, CONFIGS_URL } from '../../utils/constants'

const Admin = () => {
  const { currentUser } = useUser()
  useEffect(() => {
    if (currentUser) {
      Router.push(CONFIGS_URL)
    }
  }, [currentUser])

  return <Loading />
}

export default Admin
