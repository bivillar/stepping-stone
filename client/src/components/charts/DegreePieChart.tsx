import React, { FC } from 'react'
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'

import { COLORS } from '../../constants'

const DegreePieChart: FC<Props> = ({ data }) => (
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={data}
        cx={100}
        cy="50%"
        outerRadius={100}
        dataKey="value"
        nameKey="name"
        blendStroke
        label>
        {data.map((_, index) => (
          <Cell fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
    </PieChart>
  </ResponsiveContainer>
)

interface Props {
  data: ChartData[]
}

export default DegreePieChart
