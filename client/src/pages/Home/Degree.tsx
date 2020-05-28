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

const DEGREE_LEVELS = new Map([
  ['Tecnólogo', 0],
  ['Bacharelado', 1],
  ['Licenciatura', 2],
  ['Mestrado', 3],
  ['Doutorado', 4],
])

const DEGREE_LVL_INITIAL_DATA = [
  { name: 'Tecnólogo', value: 0 },
  { name: 'Bacharelado', value: 0 },
  { name: 'Licenciatura', value: 0 },
  { name: 'Mestrado', value: 0 },
  { name: 'Doutorado', value: 0 },
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
  const [degreeLevelsData, setDegreeLevelData] = useState<ChartData[]>(
    DEGREE_LVL_INITIAL_DATA
  )
  const [yearsData, setYearsData] = useState<YearsChartData[]>(
    YEARS_INITAL_DATA
  )
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let newDegreeData = DEGREE_INITIAL_DATA
    let newDegreeLevelData = DEGREE_LVL_INITIAL_DATA
    let yearsNewData = YEARS_INITAL_DATA
    formEntries.forEach(({ degree, degreeLevel, gradYear }: FormEntry) => {
      const degreeLevelIndex = DEGREE_LEVELS.get(degreeLevel)
      if (degreeLevelIndex) newDegreeLevelData[degreeLevelIndex].value += 1

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
    setDegreeLevelData(newDegreeLevelData.filter(({ value }) => value > 0))
    console.log(newDegreeLevelData)
    setYearsData(
      yearsNewData.sort(({ year: yearA }, { year: yearB }) => yearA - yearB)
    )
    setLoading(false)
  }, [])

  return (
    <Container style={{ paddingTop: '10%' }} title="Formação">
      <div className="w-50">
        <div className="h-50">
          <DegreePieChart data={degreeData} />
        </div>
        <div className="h-50 w-80">
          <DegreePieChart data={degreeLevelsData} />
        </div>
      </div>
      <div className="w-50 h-100 flex items-center justify-end">
        <YearBarChart yearsData={yearsData} degreeData={degreeData} />
      </div>
    </Container>
  )
}

interface Props {
  formEntries: (NotInFieldFormEntry | InFieldFormEntry)[]
}

export default Degree
