import React, { FC, useEffect, useState } from 'react'

import DegreePieChart from '../../components/charts/DegreePieChart'
import Container from '../../components/Container'
import YearBarChart, {
  YearsChartData,
} from '../../components/charts/YearBarChart'
import { DEGREES } from '../../constants'

const Degree: FC<Props> = ({ totalizers }) => {
  const [degreeData, setDegreeData] = useState<ChartData[]>([])
  const [degreeLevelsData, setDegreeLevelData] = useState<ChartData[]>([])
  const [yearsData, setYearsData] = useState<YearsChartData[]>([])

  useEffect(() => {
    setYearsData([...totalizers.get('gradPerYear').values()])
    setDegreeLevelData([...totalizers.get('degreeLevel').values()])
    let newDegreeData = [...totalizers.get('degree').values()]
    const data: ChartData[] = []
    const outros = { name: 'Outros', value: 0 }
    newDegreeData.forEach(({ name, value }) => {
      if (DEGREES.includes(name)) {
        data.push({ name, value })
      } else {
        outros.value += value
      }
    })
    if (outros.value > 0) data.push(outros)
    setDegreeData(data)
  }, [totalizers])

  console.log(degreeData, degreeLevelsData, yearsData)
  return (
    <Container style={{ paddingTop: '10%' }} title="Formação">
      <div className="w-50">
        <div className="h-50">
          <DegreePieChart data={degreeData} />
        </div>
        <div className="h-50 w-80">
          <DegreePieChart data={degreeLevelsData} />
        </div>
      </div>
      <div className="w-50 h-100 flex items-center justify-end">
        <YearBarChart yearsData={yearsData} degreeData={degreeData} />
      </div>
    </Container>
  )
}

interface Props {
  totalizers: Map<string, any>
}

export default Degree
