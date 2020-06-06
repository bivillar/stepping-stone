import React from 'react'

import { COLORS } from './constants'

export const range = (n: number) => [...Array(n).keys()]

export const getGradients = (n: number) => (
  <defs>
    {range(n).map((i) => (
      <linearGradient id={`gradient${i}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={COLORS[i]} stopOpacity={0.8} />
        <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0.1} />
      </linearGradient>
    ))}
  </defs>
)

export const LIGHTS = (mode: number) =>
  new Map([
    ['Engenharia da Computação', mode],
    ['Ciência da Computação', mode],
    ['Sistemas de Informação', mode],
    ['Informática', mode],
    ['Tecnólogo', mode],
  ])

export const getTotalizer = (totalizers: Map<string, any>, field: string) => [
  ...totalizers.get(field).values(),
]

export const getTotalizerKeys = (
  totalizers: Map<string, any>,
  field: string
) => [...totalizers.get(field).keys()]
