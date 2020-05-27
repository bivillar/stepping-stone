import React, { FC, useEffect, useState } from 'react'
import DegreePieChart from '../../components/charts/DegreePieChart'
import Container from '../../components/Container'
import YearBarChart, {
  YearsChartData,
} from '../../components/charts/YearBarChart'

const DEGREES = new Map([
  ['Engenharia da Computação', 0],
  ['Ciência da Computação', 1],
  ['Sistemas de Informação', 2],
  ['Informática', 3],
  ['Tecnólogo', 4],
])

const DEGREE_INITIAL_DATA = [
  { name: 'Engenharia da Computação', value: 0 },
  { name: 'Ciência da Computação', value: 0 },
  { name: 'Sistemas de Informação', value: 0 },
  { name: 'Informática', value: 0 },
  { name: 'Tecnólogo', value: 0 },
  { name: 'Other', value: 0 },
]

const YEARS = new Map()

const YEARS_INITAL_DATA: YearsChartData[] = []

const YEAR_INITIAL_DATA = {
  year: 0,
  e: 0,
  c: 0,
  s: 0,
  i: 0,
  t: 0,
  o: 0,
}
const Degree: FC<Props> = ({ formEntries }) => {
  const [degreeData, setDegreeData] = useState<ChartData[]>(DEGREE_INITIAL_DATA)
  const [yearsData, setYearsData] = useState<YearsChartData[]>(
    YEARS_INITAL_DATA
  )
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let newDegreeData = DEGREE_INITIAL_DATA
    let yearsNewData = YEARS_INITAL_DATA
    formEntries.forEach(({ degree, gradYear }: FormEntry) => {
      const degreeIndex = DEGREES.get(degree) ?? 5
      newDegreeData[degreeIndex].value += 1

      let yearIndex = YEARS.get(gradYear)
      if (!yearIndex) {
        yearIndex = yearsNewData.length
        YEARS.set(gradYear, yearIndex)
        yearsNewData.push({ ...YEAR_INITIAL_DATA, year: gradYear })
      }
      if (degreeIndex == 5) yearsNewData[yearIndex].o += 1
      // @ts-ignore
      else yearsNewData[yearIndex][degree.charAt(0).toLowerCase()] += 1
    })
    setDegreeData(newDegreeData.filter(({ value }) => value > 0))
    setYearsData(
      yearsNewData.sort(({ year: yearA }, { year: yearB }) => yearA - yearB)
    )
    console.log(JSON.stringify(yearsNewData))
    setLoading(false)
  }, [])

  return (
    <Container>
      <DegreePieChart data={degreeData} />
      <YearBarChart yearsData={yearsData} degreeData={degreeData} />
    </Container>
  )
}

interface Props {
  formEntries: (NotInFieldFormEntry | InFieldFormEntry)[]
}

export default Degree
