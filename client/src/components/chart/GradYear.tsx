import React, { FC } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import useVisible from '../../utils/hooks/useVisible'

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

const GradYear: FC = () => {
  const [isVisible, setRef] = useVisible()

  return (
    <div ref={setRef as any}>
      {isVisible && (
        <AreaChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5204bf" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#5204bf" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" stroke="#5204bf" />
          <YAxis stroke="#5204bf" name="Mulheres" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#5204bf"
            fillOpacity={1}
            fill="url(#gradient)"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      )}
    </div>
  )
}

export default GradYear
