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
      {payload &&
        payload.map(({ value, dataKey }) => {
          let valueLabel =
            dataKey === 'male' ? 'Homens Formados:' : 'Mulheres Formadas:'
          return (
            <div key={dataKey as string} className="pa0">{`${valueLabel} ${
              dataKey === 'percentage' ? `${(+value).toFixed(2)}%` : `${value}`
            }`}</div>
          )
        })}
    </div>
  )
}

const GradChart: FC<Props> = ({ config, data }) => {
  let datakey: string = 'female'
  let name: string = 'Mulheres'

  if (config.showPercentage) {
    datakey = 'percentage'
    name = 'Porcentagem de Mulheres'
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
        <YAxis stroke={COLORS[0]} name={name} />
        <Tooltip content={CustomTooltip} />

        {config.showMale && (
          <Line
            type="monotone"
            dataKey="male"
            name="Homens"
            stroke={COLORS[0]}
            activeDot={{ r: 6, fill: COLORS[2], stroke: COLORS[2] }}
            dot={{ r: 3, fill: COLORS[2], stroke: COLORS[2] }}
          />
        )}
        <Line
          type="monotone"
          dataKey={datakey}
          name={name}
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
