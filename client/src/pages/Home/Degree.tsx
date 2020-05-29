import React, { FC, useEffect, useState } from 'react'

import DegreePieChart from '../../components/charts/DegreePieChart'
import Container from '../../components/Container'
import YearBarChart, {
  YearsChartData,
} from '../../components/charts/YearBarChart'

const Degree: FC<Props> = ({ totalizers }) => {
  const [degreeData, setDegreeData] = useState<ChartData[]>([])
  const [degreeLevelsData, setDegreeLevelData] = useState<ChartData[]>([])
  const [yearsData, setYearsData] = useState<YearsChartData[]>([])

  useEffect(() => {
    setYearsData(totalizers.get('gradPerYear'))
    setDegreeLevelData(totalizers.get('degreeLevel'))
    setDegreeData(totalizers.get('degree'))
    console.log(totalizers)
  }, [totalizers])

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
