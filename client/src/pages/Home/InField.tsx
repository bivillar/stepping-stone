import React, { FC, useState, useEffect } from 'react'
import Container from '../../components/Container'
import { getTotalizer } from '../../utils'
import PieChart from '../../components/charts/PieChart'
import { COLORS } from '../../constants'

const InField: FC<Props> = ({ totalizers }) => {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    setData(getTotalizer(totalizers, 'stillInField'))
  }, [])

  return (
    <Container title="Continuam na área">
      <div className="h-100 w-50">
        <PieChart data={data} colors={[COLORS[0], COLORS[4]]} radius={200} />
      </div>
    </Container>
  )
}

interface Props {
  totalizers: Map<string, any>
}

export default InField
