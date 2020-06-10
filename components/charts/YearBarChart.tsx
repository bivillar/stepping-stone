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

import { COLORS, ON, OFF } from '../../utils/constants'

const YearBarChart: FC<Props> = ({ yearsData, degreeData }) => {
  const [focus, setFocus] = useState<string | null>(null)

  const handleMouseEnter = ({ value }: { value: string }) => {
    setFocus(value)
  }
  const handleMouseLeave = () => {
    setFocus(null)
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
            opacity={focus ? (focus === name ? ON : OFF) : ON}
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
