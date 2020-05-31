import React, { FC } from 'react'
import {
  PieChart as _PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'

import { COLORS } from '../../constants'

const PieChart: FC<Props> = ({ data, radius, colors = COLORS }) => (
  <ResponsiveContainer>
    <_PieChart>
      <Pie
        data={data}
        cx={radius + 40}
        cy="50%"
        outerRadius={radius}
        dataKey="value"
        nameKey="name"
        blendStroke
        label>
        {data.map((_, index) => (
          <Cell fill={colors[index]} key={index} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
    </_PieChart>
  </ResponsiveContainer>
)

interface Props {
  data: ChartData[]
  radius: number
  colors?: string[]
}

export default PieChart
