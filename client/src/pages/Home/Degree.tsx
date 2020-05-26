import React, { FC, useEffect, useState } from 'react'
import DegreePieChart from '../../components/chart/DegreePieChart'
import Container from '../../components/Container'

const DEGREES = new Map([
  ['Engenharia da Computação', 0],
  ['Ciência da Computação', 1],
  ['Sistemas de Informação', 2],
  ['Informática', 3],
  ['Tecnólogo', 4],
])

const INITIAL_DATA = [
  { name: 'Engenharia da Computação', value: 0 },
  { name: 'Ciência da Computação', value: 0 },
  { name: 'Sistemas de Informação', value: 0 },
  { name: 'Informática', value: 0 },
  { name: 'Tecnólogo', value: 0 },
  { name: 'Other', value: 0 },
]

const Degree: FC<Props> = ({ formEntries }) => {
  const [data, setData] = useState<ChartData[]>(INITIAL_DATA)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let newData = INITIAL_DATA
    formEntries.forEach(({ degree }: { degree: string }) => {
      const index = DEGREES.get(degree) ?? 5
      newData[index].value += 1
    }, INITIAL_DATA)
    setData(newData.filter(({ value }) => value > 0))
    setLoading(false)
  }, [])

  return (
    <Container>
      <DegreePieChart data={data} />
    </Container>
  )
}

interface Props {
  formEntries: (NotInFieldFormEntry | InFieldFormEntry)[]
}

export default Degree
