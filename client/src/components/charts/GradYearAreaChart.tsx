import React, { FC } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  Line,
  TooltipProps,
} from 'recharts'
import useVisible from '../../utils/hooks/useVisible'

import { COLORS } from '../../constants'

const data = [
  { name: 1991, value: 5 },
  { name: 1992, value: 44 },
  { name: 1993, value: 59 },
  { name: 1994, value: 65 },
  { name: 1995, value: 69 },
  { name: 1996, value: 64 },
  { name: 1997, value: 40 },
  { name: 1998, value: 64 },
  { name: 1999, value: 70 },
  { name: 2000, value: 59 },
  { name: 2001, value: 42 },
  { name: 2002, value: 25 },
  { name: 2003, value: 25 },
  { name: 2004, value: 16 },
  { name: 2005, value: 16 },
  { name: 2006, value: 11 },
  { name: 2007, value: 14 },
  { name: 2008, value: 10 },
  { name: 2009, value: 13 },
  { name: 2010, value: 11 },
  { name: 2011, value: 13 },
  { name: 2012, value: 8 },
  { name: 2013, value: 9 },
  { name: 2014, value: 10 },
  { name: 2015, value: 8 },
  { name: 2016, value: 6 },
  { name: 2017, value: 6 },
  { name: 2018, value: 5 },
  { name: 2019, value: 3 },
]

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active) return null

  return (
    <div className="chartTooltip pv2 ph3">
      <div className="pa0 pb1 b">{label}</div>
      <div className="pa0">{`Mulheres Formadas: ${payload &&
        payload[0].value}`}</div>
    </div>
  )
}

const GradYear: FC = () => {
  const [isVisible, setRef] = useVisible()

  return (
    <div ref={setRef as any} className="w-100 flex justify-end">
      {isVisible && (
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLORS[0]}
            strokeOpacity={0.4}
          />
          <XAxis dataKey="name" stroke={COLORS[0]} />
          <YAxis stroke={COLORS[0]} name="Mulheres" />
          <Tooltip content={CustomTooltip} />

          <Line
            type="monotone"
            dataKey="value"
            name="Mulheres"
            stroke={COLORS[5]}
            activeDot={{ r: 6, fill: COLORS[4], stroke: COLORS[4] }}
            dot={{ r: 3, fill: COLORS[4], stroke: COLORS[4] }}
          />
        </LineChart>
      )}
    </div>
  )
}

export default GradYear
