import React, { FC, useState, useEffect } from 'react'

import BarChart from '../charts/BarChart'
import { getTotalizer } from '../../utils'
import Container from '../Container'

const Salary: FC<Props> = ({ totalizers, showMobile, title }) => {
  const [salary, setSalary] = useState<any[]>([])

  useEffect(() => {
    setSalary(getTotalizer(totalizers, 'salary'))
  }, [totalizers])

  return (
    <div className="w-70-ns w-100" style={{ height: '40%' }}>
      <BarChart data={salary} name="Faixa Salarial" />
    </div>
  )
}

interface Props {
  totalizers: Totalizers
  title: string
  showMobile: boolean
}

export default Salary
