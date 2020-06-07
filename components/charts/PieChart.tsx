import React, { FC } from 'react'
import {
  PieChart as _PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'

import { COLORS } from '../../utils/constants'

const PieChart: FC<Props> = ({
  data,
  radius,
  colors = COLORS,
  legendOptions,
}) => (
  <ResponsiveContainer>
    <_PieChart>
      <Pie
        animationDuration={1000}
        data={data}
        cx={radius + 40}
        cy="50%"
        outerRadius={radius}
        dataKey="value"
        nameKey="name"
        blendStroke
        label>
        {Object.keys(data).map((_, index) => (
          <Cell fill={colors[index]} key={index} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        {...legendOptions}
      />
    </_PieChart>
  </ResponsiveContainer>
)

interface Props {
  data: any[]
  radius: number
  colors?: string[]
  legendOptions?: any
}

export default PieChart
