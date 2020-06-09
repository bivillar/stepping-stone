import React, { FC, useState } from 'react'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts'

import { LIGHTS } from '../../utils'
import { COLORS, ON, OFF } from '../../utils/constants'

const YearBarChart: FC<Props> = ({ yearsData, degreeData }) => {
  const [opacity, setOpacity] = useState<any>(LIGHTS(ON))

  const handleMouseEnter = ({ value }: { value: string }) => {
    const newOpacity = new Map([...LIGHTS(OFF)])
    newOpacity.set(value, 1)
    setOpacity(newOpacity)
  }
  const handleMouseLeave = () => {
    setOpacity(LIGHTS(ON))
  }

  return (
    <ResponsiveContainer>
      <BarChart
        data={yearsData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={COLORS[0]}
          strokeOpacity={0.4}
        />
        <XAxis dataKey="gradYear" />
        <YAxis />
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          layout="vertical"
        />
        {degreeData.map(({ name }, i) => (
          <Bar
            animationEasing="ease-out"
            animationDuration={1000}
            key={i}
            dataKey={name}
            fill={COLORS[i]}
            name={name}
            opacity={opacity.get(name)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

interface Props {
  yearsData: any[]
  degreeData: any[]
}

export default YearBarChart
