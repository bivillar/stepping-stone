import React, { FC, useState, useEffect } from 'react'

import { getTotalizer } from '../../utils'
import PieChart from '../charts/PieChart'

const Role: FC<Props> = ({ totalizers }) => {
  const [roles, setRoles] = useState<any[]>([])
  const [seniority, setSeniority] = useState<any[]>([])

  useEffect(() => {
    setRoles(getTotalizer(totalizers, 'role'))
    setSeniority(getTotalizer(totalizers, 'seniorityDegree'))
  }, [totalizers])

  const legendOptions = {
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right',
  }

  return (
    <>
      <div className="h-100 w-70 dn db-ns">
        <PieChart data={roles} radius={200} legendOptions={legendOptions} />
      </div>
      <div className="h-75 w-100 db dn-ns pt4">
        <PieChart
          data={roles}
          radius={75}
          pieOptions={{ cy: 75 + 40, cx: '50%' }}
        />
      </div>
    </>
  )
}

interface Props {
  totalizers: Totalizers
}

export default Role
