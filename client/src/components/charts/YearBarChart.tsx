import React, { FC } from 'react'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts'

import { COLORS } from '../../constants'

const YearBarChart: FC<Props> = ({ yearsData, degreeData }) => (
  <BarChart
    width={600}
    height={300}
    data={yearsData}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid
      strokeDasharray="3 3"
      stroke={COLORS[0]}
      strokeOpacity={0.4}
    />
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Legend />
    {degreeData.map(({ name }, i) => (
      <Bar
        dataKey={name.charAt(0).toLowerCase()}
        fill={COLORS[i]}
        name={name}
      />
    ))}
  </BarChart>
)

export interface YearsChartData {
  year: number
  e: number
  c: number
  s: number
  i: number
  t: number
  o: number
}

interface Props {
  yearsData: YearsChartData[]
  degreeData: ChartData[]
}

export default YearBarChart
