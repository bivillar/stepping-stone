import React, { FC, useEffect, useState } from 'react'

import DegreePieChart from '../../components/charts/PieChart'
import Container from '../../components/Container'
import YearBarChart, {
  YearsChartData,
} from '../../components/charts/YearBarChart'
import { DEGREES } from '../../constants'
import { getTotalizer } from '../../utils'

const Degree: FC<Props> = ({ totalizers }) => {
  const [degreeData, setDegreeData] = useState<ChartData[]>([])
  const [degreeLevelsData, setDegreeLevelData] = useState<ChartData[]>([])
  const [yearsData, setYearsData] = useState<YearsChartData[]>([])

  useEffect(() => {
    setYearsData(getTotalizer(totalizers, 'gradPerYear'))
    setDegreeLevelData(getTotalizer(totalizers, 'degreeLevel'))
    let newDegreeData = getTotalizer(totalizers, 'degree')

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

  return (
    <Container title="Formação">
      <div className="w-50 h-100">
        <div className="h-50">
          <DegreePieChart data={degreeData} radius={100} />
        </div>
        <div className="h-50 w-80">
          <DegreePieChart data={degreeLevelsData} radius={100} />
        </div>
      </div>
      <div className="w-50 h-50 flex items-center justify-end">
        <YearBarChart yearsData={yearsData} degreeData={degreeData} />
      </div>
    </Container>
  )
}

interface Props {
  totalizers: Map<string, any>
}

export default Degree
