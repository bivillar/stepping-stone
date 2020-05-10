import React, { FC, useEffect, useState } from 'react'
import Firebase from '../../base'

const UserList: FC<Props> = ({}) => {
  const [users, setUsers] = useState<User[]>()
  useEffect(() => {
    Firebase.getAllUsers().then(setUsers)
  }, [])

  console.log(users)

  return (
    <div className="adminContainer">
      <ul className="">
        {users?.map(({ email, resourcers, isAdmin }) => (
          <div key={email}>
            <li className="">
              {email}
              {resourcers?.map(resource => resource)}
              {isAdmin ? 'ADMIN' : 'NOT ADMIN'}
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

interface Props {}

export default UserList
