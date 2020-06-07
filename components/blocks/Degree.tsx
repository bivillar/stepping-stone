import React, { FC, useEffect, useState } from 'react'

import DegreePieChart from '../charts/PieChart'
import Container from '../Container'
import YearBarChart, { YearsChartData } from '../charts/YearBarChart'
import { DEGREES } from '../../utils/constants'
import { getTotalizer } from '../../utils'

const Degree: FC<Props> = ({ totalizers }) => {
  const [degreeData, setDegreeData] = useState<any[]>([])
  const [degreeLevelsData, setDegreeLevelData] = useState<any[]>([])
  const [yearsData, setYearsData] = useState<any[]>([])

  useEffect(() => {
    setYearsData(getTotalizer(totalizers, 'gradPerYear'))
    setDegreeLevelData(getTotalizer(totalizers, 'degreeLevel'))
    setDegreeData(getTotalizer(totalizers, 'degree'))
  }, [totalizers])

  return (
    <Container title="Formação">
      <div className="w-50 h-100 dn db-ns">
        {/* not mobile */}
        <div className="h-50">
          <DegreePieChart data={degreeData} radius={100} />
        </div>
        <div className="h-50 w-80">
          <DegreePieChart data={degreeLevelsData} radius={100} />
        </div>
      </div>
      <div className="w-100 h-100 flex flex-column justify-center dn-ns">
        {/* mobile */}
        <div className="h-30 w-100">
          <DegreePieChart
            legendOptions={{ margin: { left: 10, right: 0 }, width: 125 }}
            data={degreeData}
            radius={50}
          />
        </div>
        <div className="h-30 w-100">
          <DegreePieChart
            legendOptions={{ margin: { left: 10, right: 0 }, width: 125 }}
            data={degreeLevelsData}
            radius={50}
          />
        </div>
      </div>
      <div className="dn w-50 h-50 flex-ns items-center-ns justify-end-ns">
        <YearBarChart yearsData={yearsData} degreeData={degreeData} />
      </div>
    </Container>
  )
}

interface Props {
  totalizers: any
}

export default Degree
