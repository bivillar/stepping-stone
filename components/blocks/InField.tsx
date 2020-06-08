import React, { FC, useState, useEffect } from 'react'

import { getTotalizer } from '../../utils'
import PieChart from '../charts/PieChart'
import { COLORS } from '../../utils/constants'

const InField: FC<Props> = ({ totalizers }) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(getTotalizer(totalizers, 'stillInField'))
  }, [])

  const legendOptions = {
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right',
  }

  return (
    <>
      <div className="h-100 w-50 dn db-ns">
        <PieChart
          data={data}
          colors={[COLORS[0], COLORS[4]]}
          radius={200}
          legendOptions={legendOptions}
        />
      </div>
      <div className="h-100 w-100 db dn-ns">
        <PieChart
          data={data}
          colors={[COLORS[0], COLORS[4]]}
          radius={80}
          legendOptions={legendOptions}
        />
      </div>
    </>
  )
}

interface Props {
  totalizers: Totalizers
}

export default InField
