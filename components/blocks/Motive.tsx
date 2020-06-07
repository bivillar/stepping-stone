import React, { FC, useState, useEffect } from 'react'

import MotivesBarChart from '../charts/MotivesBarChart'
import { getTotalizer } from '../../utils'

const Motive: FC<Props> = ({ totalizers }) => {
  const [motives, setMotives] = useState<any[]>([])

  useEffect(() => {
    setMotives(getTotalizer(totalizers, 'motive'))
  }, [totalizers])

  return (
    <>
      <div className="w-70-ns w-100" style={{ height: '40%' }}>
        <MotivesBarChart data={motives} />
      </div>
    </>
  )
}

interface Props {
  totalizers: Totalizers
}

export default Motive
