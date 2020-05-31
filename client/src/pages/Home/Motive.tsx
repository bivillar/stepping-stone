import React, { FC, useState, useEffect } from 'react'
import YearBarChart from '../../components/charts/YearBarChart'
import Container from '../../components/Container'
import MotivesBarChart from '../../components/charts/MotivesBarChart'

const Motive: FC<Props> = ({ totalizers }) => {
  const [motives, setMotives] = useState<ChartData[]>([])

  useEffect(() => {
    setMotives([...totalizers.get('motive').values()])
  }, [totalizers])

  return (
    <Container title="Motivos">
      <div className="w-70" style={{ height: '40%' }}>
        <MotivesBarChart data={motives} />
      </div>
    </Container>
  )
}

interface Props {
  totalizers: Map<string, any>
}

export default Motive
