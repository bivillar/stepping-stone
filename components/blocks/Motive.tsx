import React, { FC, useState, useEffect } from 'react'

import BarChart from '../charts/BarChart'
import { getTotalizer } from '../../utils'

const Motive: FC<Props> = ({ totalizers }) => {
  const [motives, setMotives] = useState<any[]>([])

  useEffect(() => {
    setMotives(getTotalizer(totalizers, 'motive'))
  }, [totalizers])

  return (
    <div className="w-70-ns w-100" style={{ height: '40%' }}>
      <BarChart data={motives} name="Motivo" />
    </div>
  )
}

interface Props {
  totalizers: Totalizers
}

export default Motive
