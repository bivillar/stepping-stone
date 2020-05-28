import React, { FC, useState } from 'react'
import YearBarChart from '../../components/charts/YearBarChart'

const Motives: FC<Props> = ({ formEntries }) => {
  const [motives, setMotives] = useState<string>()
  return <div></div>
}

interface Props {
  formEntries: (NotInFieldFormEntry | InFieldFormEntry)[]
}

export default Motives
