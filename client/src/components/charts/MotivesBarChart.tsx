import React, { FC } from 'react'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { COLORS } from '../../constants'

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active) return null

  return (
    <div className="chartTooltip pv2 ph3">
      <div className="pa0 pb1 b">{label}</div>
      <div className="pa0">{`Quantidade: ${payload && payload[0].value}`}</div>
    </div>
  )
}

const MotivesBarChart: FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer>
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar
          dataKey="value"
          name="Motivo"
          fill={COLORS[4]}
          background={{ fill: COLORS[4], opacity: 0.3 }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface Props {
  data: ChartData[]
}

export default MotivesBarChart
