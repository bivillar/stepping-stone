import React, { FC, useState, useEffect } from 'react'
import YearBarChart from '../charts/YearBarChart'
import Container from '../Container'
import MotivesBarChart from '../charts/MotivesBarChart'
import { getTotalizer } from '../../utils'

const Motive: FC<Props> = ({ totalizers }) => {
  const [motives, setMotives] = useState<any[]>([])

  useEffect(() => {
    setMotives(getTotalizer(totalizers, 'motive'))
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
  totalizers: any
}

export default Motive
