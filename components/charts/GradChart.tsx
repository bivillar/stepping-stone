import React, { FC } from 'react'
import {
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  Line,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts'

import { COLORS } from '../../utils/constants'

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active) return null

  return (
    <div className="chartTooltip pv2 ph3">
      <div className="pa0 pb1 b">{label}</div>
      <div className="pa0">{`Mulheres Formadas: ${
        payload && payload[0].value
      }`}</div>
    </div>
  )
}

const GradChart: FC<Props> = ({ config, data }) => {
  let datakey: string
  if (config.showPercentage) {
    datakey = 'percentage'
  } else if (config.showMale) {
    datakey = 'male'
  } else {
    datakey = 'female'
  }

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: -30, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={COLORS[0]}
          strokeOpacity={0.4}
        />
        <XAxis dataKey="year" stroke={COLORS[0]} />
        <YAxis stroke={COLORS[0]} name="Mulheres" />
        <Tooltip content={CustomTooltip} />

        <Line
          type="monotone"
          dataKey={datakey}
          name="Mulheres"
          stroke={COLORS[5]}
          activeDot={{ r: 6, fill: COLORS[4], stroke: COLORS[4] }}
          dot={{ r: 3, fill: COLORS[4], stroke: COLORS[4] }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface Props {
  config: GradChartConfig
  data: ChartData[]
}

export default GradChart
