import React, { FC, useState, useEffect } from 'react'

import Container from '../../components/Container'
import DegreePieChart from '../../components/charts/DegreePieChart'

const DEGREES = new Map([
  ['Tecnólogo', 0],
  ['Bacharelado', 1],
  ['Licenciatura', 2],
  ['Mestrado', 3],
  ['Doutorado', 4],
])

const DEGREE_INITIAL_DATA = [
  { name: 'Tecnólogo', value: 0 },
  { name: 'Bacharelado', value: 0 },
  { name: 'Licenciatura', value: 0 },
  { name: 'Mestrado', value: 0 },
  { name: 'Doutorado', value: 0 },
]

const MaxDegree: FC<Props> = ({ formEntries }) => {
  const [degreeData, setDegreeData] = useState<ChartData[]>(DEGREE_INITIAL_DATA)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let newDegreeData = DEGREE_INITIAL_DATA
    formEntries.forEach(({ degreeLevel }: FormEntry) => {
      const degreeIndex = DEGREES.get(degreeLevel)
      if (degreeIndex) newDegreeData[degreeIndex].value += 1
    })
    setDegreeData(newDegreeData.filter(({ value }) => value > 0))
    console.log(newDegreeData)
    setLoading(false)
  }, [])

  return (
    <Container>
      <div className="w-100 h-100">
        <DegreePieChart data={degreeData} />
      </div>
    </Container>
  )
}

interface Props {
  formEntries: (NotInFieldFormEntry | InFieldFormEntry)[]
}

export default MaxDegree
