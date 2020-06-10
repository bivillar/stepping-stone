import React, { FC, useEffect, useState } from 'react'

import { getTotalizer } from '../../utils'
import BarChart from '../charts/BarChart'

const Satisfaction: FC<Props> = ({ totalizers }) => {
  const [satisfaction, setSatisfaction] = useState<any[]>([])

  useEffect(() => {
    setSatisfaction(getTotalizer(totalizers, 'satisfaction'))
  }, [totalizers])

  return (
    <div className="w-70-ns w-100" style={{ height: '40%' }}>
      <BarChart data={satisfaction} name="Grau de satisfação" />
    </div>
  )
}

interface Props {
  totalizers: Totalizers
}

export default Satisfaction
