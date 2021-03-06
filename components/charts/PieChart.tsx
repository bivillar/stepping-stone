import React, { FC, useState } from 'react'
import {
  PieChart as _PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'

import { COLORS, BLACK, OFF, ON } from '../../utils/constants'

const PieChart: FC<Props> = ({
  data,
  radius,
  colors = COLORS,
  legendOptions = {},
  pieOptions: _pieOptions = {},
}) => {
  const [focus, setFocus] = useState<string | null>(null)

  const handleMouseEnter = ({ value }: { value: string }) => {
    setFocus(value)
  }

  const handleMouseLeave = () => {
    setFocus(null)
  }

  const pieOptions = {
    animationDuration: 1000,
    data,
    cx: radius + 40,
    cy: '50%',
    outerRadius: radius,
    dataKey: 'value',
    nameKey: 'name',
    stroke: BLACK,
    label: true,
    ..._pieOptions,
  }

  return (
    <ResponsiveContainer>
      <_PieChart>
        <Pie {...pieOptions}>
          {data.map(({ name }, index) => (
            <Cell
              fill={colors[index]}
              key={index}
              opacity={!focus ? ON : focus === name ? ON : OFF}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...legendOptions}
        />
      </_PieChart>
    </ResponsiveContainer>
  )
}

interface Props {
  data: any[]
  radius: number
  colors?: string[]
  legendOptions?: any
  pieOptions?: any
}

export default PieChart
