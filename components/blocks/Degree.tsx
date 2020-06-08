import React, { FC, useEffect, useState } from 'react'

import PieChart from '../charts/PieChart'
import YearBarChart from '../charts/YearBarChart'
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

  const legendOptions = {
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right',
  }

  const mobileLegend = {
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right',
    width: 125,
  }

  return (
    <>
      <div className="w-50 h-100 dn db-ns">
        {/* not mobile */}
        <div className="h-50 w-100">
          <PieChart
            data={degreeData}
            radius={100}
            legendOptions={legendOptions}
          />
        </div>
        <div className="h-50 w-80">
          <PieChart
            data={degreeLevelsData}
            radius={100}
            legendOptions={legendOptions}
          />
        </div>
      </div>
      <div className="w-100 h-100 flex flex-column justify-center dn-ns">
        {/* mobile */}
        <div className="h-30 w-100">
          <PieChart
            legendOptions={mobileLegend}
            data={degreeData}
            radius={50}
          />
        </div>
        <div className="h-30 w-100">
          <PieChart
            legendOptions={legendOptions}
            data={degreeLevelsData}
            radius={50}
          />
        </div>
      </div>
      <div className="dn w-50 h-50 flex-ns items-center-ns justify-end-ns">
        <YearBarChart yearsData={yearsData} degreeData={degreeData} />
      </div>
    </>
  )
}

interface Props {
  totalizers: Totalizers
}

export default Degree
