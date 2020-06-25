import React, { FC, useState, useEffect } from 'react'
import { TooltipProps } from 'recharts'

import { getTotalizer } from '../../utils'
import BarChart from '../charts/BarChart'

const Company: FC<Props> = ({ totalizers }) => {
  const [type, setType] = useState<any[]>([])

  useEffect(() => {
    setType(getTotalizer(totalizers, 'companyType'))
  }, [])

  return (
    <div className="w-70-ns w-100" style={{ height: '40%' }}>
      <BarChart data={type} name="Tipo de Empresa" invertGradient />
    </div>
  )
}

interface Props {
  totalizers: Totalizers
}

export default Company
