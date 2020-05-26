import React, { FC } from 'react'
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'

const DegreePieChart: FC<Props> = ({ data }) => (
  <div className="w-100 h-100">
    <ResponsiveContainer>
      <PieChart>
        <defs>
          <linearGradient id="gradient0" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5204bf" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#5204bf" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f22797" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f22797" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4158d9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4158d9" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f21651" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f21651" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="gradient4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d0d0d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0d0d0d" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="gradient5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#b15c8b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#b15c8b" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          cx="30%"
          cy="50%"
          outerRadius={200}
          dataKey="value"
          nameKey="name"
          blendStroke
          label>
          {data.map((entry, index) => (
            <Cell fill={`url(#gradient${index})`} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  </div>
)

interface Props {
  data: ChartData[]
}

export default DegreePieChart
