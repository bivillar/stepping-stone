import React, { FC } from 'react'
import { useUser } from '../../utils/firebase/useUser'
import AdminContainer from '../../components/AdminContainer'

const Configs: FC<Props> = ({}) => {
  const { currentUser } = useUser()

  return (
    <AdminContainer hasPermission={currentUser?.canConfig}></AdminContainer>
  )
}

interface Props {}

export default Configs
