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
import { COLORS } from '../../utils/constants'

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
        <defs>
          <linearGradient
            id="gradient"
            spreadMethod="pad"
            opacity={0.8}
            x1="0"
            y1="0"
            x2="1"
            y2="0">
            <stop offset="0%" stopColor={COLORS[6]} />
            <stop offset="68" stopColor={COLORS[3]} />
            <stop offset="100%" stopColor={COLORS[0]} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar
          animationDuration={2000}
          dataKey="value"
          name="Motivo"
          fill="url(#gradient)"
          background={{ fill: COLORS[4], opacity: 0.3 }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface Props {
  data: any[]
}

export default MotivesBarChart
