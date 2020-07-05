import React, { FC, useState, useEffect } from 'react'
import { Table, Alert, Form } from 'react-bootstrap'
import { BsX as XIcon, BsPlus as PlusIcon } from 'react-icons/bs'
import UiRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

import { useUser } from '../../utils/firebase/useUser'
import Firebase from '../../utils/firebase/base'
import Button from '../../components/Button'
import AdminContainer from '../../components/AdminContainer'
import TableItemForm from '../../components/gradsTable/TableItemForm'
import TableItem from '../../components/gradsTable/TableItem'
import TableItemSkeleton from '../../components/TableItemSkeleton'
import GradChart from '../../components/charts/GradChart'
import { COLORS } from '../../utils/constants'

const Radio = withStyles({
  root: {
    color: COLORS[5],
    '&$checked': {
      color: COLORS[5],
    },
  },
  checked: {},
})((props) => <UiRadio color="default" {...props} />)

const Chart: FC = () => {
  const { currentUser } = useUser()
  const [years, setYears] = useState<ChartData[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isEditing, setEditing] = useState<boolean>(false)
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)
  const [config, setConfig] = useState<GradChartConfig>({
    showMale: false,
    showPercentage: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [canShowMale, setCanShowMale] = useState<boolean>(false)

  const sortYears = (years: ChartData[]) => {
    return years.sort(({ year: A }, { year: B }) => A - B)
  }

  useEffect(() => {
    const base = new Firebase()
    base.getGradChartData().then(({ grads, config }) => {
      setYears(sortYears(grads))
      updateCanShowMale(grads)
      setConfig(config)
      setLoading(false)
    })
  }, [])

  const handleAddYear = (year: string, female: number, male?: number) => {
    if (years?.find(({ year: y }) => y === year)) {
      setError(`O ano ${year} já existe!`)
      return
    }
    const base = new Firebase()
    const percentage = male ? (female * 100) / (male + female) : 0
    const newYears = [
      ...years,
      {
        year,
        female,
        male,
        percentage,
      },
    ].sort(({ year: A }, { year: B }) => +A - +B)
    setYears(newYears)
    base.addNewGradChartYear(year, female, male, percentage)
    setIsAddingUser(false)
    setEditing(false)
    updateCanShowMale(newYears)
  }

  const updateConfigs = (showMale: boolean, showPercentage: boolean) => {
    const base = new Firebase()
    setConfig({ showMale, showPercentage })
    base.updateGradCharConfig(showMale, showPercentage)
  }

  const deleteYear = (index: number) => {
    const removedYear = years?.[index].year
    const newYears = years?.filter(({ year }) => year !== removedYear)
    updateCanShowMale(newYears)
    setYears(newYears)
  }

  const updateYears = (yearData: {
    year: string
    female: number
    male?: number
    percentage?: number
  }) => {
    const index = years?.findIndex(({ year: y }) => y == yearData.year)
    const newYears = years
    newYears![index!] = yearData
    setYears(newYears)
    updateCanShowMale(newYears)
  }

  const updateCanShowMale = (newYears?: ChartData[]) => {
    const data = newYears ?? years
    const can = !data?.some(({ male }) => typeof male == 'undefined')
    setCanShowMale(can)
    if (!can) updateConfigs(false, false)
  }

  return (
    <AdminContainer hasPermission={currentUser?.canManageUsers}>
      <div className="adminContainer">
        <h1>Gerenciar Gráfico de Mulheres Formadas por Ano</h1>
        <p>
          Aqui você pode adicionar e remover a quantidade de mulheres e homens
          que se formaram em cada ano nos cursos de computação da PUC-Rio.
        </p>
        <div className="pt3 flex w-100">
          <div className="w-50">
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible>
                {error}
              </Alert>
            )}
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover table-fixed-chart">
                <thead>
                  <tr className="w-100">
                    <th>Ano</th>
                    <th>Mulheres</th>
                    <th>Homens</th>
                    <th>
                      {isAddingUser ? (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setEditing(false)
                            setIsAddingUser(false)
                          }}>
                          <XIcon />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditing(true)
                            setIsAddingUser(true)
                          }}>
                          <PlusIcon />
                        </Button>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isAddingUser && (
                    <TableItemForm handleAddYear={handleAddYear} />
                  )}
                  {loading ? (
                    <TableItemSkeleton nCol={3} />
                  ) : (
                    years?.map((yearData, i) => (
                      <TableItem
                        key={yearData.year}
                        yearData={yearData}
                        setEditing={setEditing}
                        disabled={isEditing}
                        deleteYear={() => deleteYear(i)}
                        updateYears={updateYears}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-50 pl3" style={{ height: '500px' }}>
            <div className="chart-card card flex flex-column justify-content-around items-center">
              <div className="h-50 w-100">
                {!loading && years && (
                  <GradChart data={years} config={config} />
                )}
              </div>
              <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel
                  value="female"
                  style={{ marginBottom: '0px' }}
                  control={<Radio />}
                  label="Valor Absoluto"
                  checked={!config.showMale && !config.showPercentage}
                  onChange={() => updateConfigs(false, false)}
                />
                <FormControlLabel
                  label="Mostrar Homens"
                  checked={config.showMale}
                  style={{ marginBottom: '0px' }}
                  disabled={!canShowMale}
                  onChange={() => updateConfigs(!config.showMale, false)}
                  control={<Radio />}
                />
                <FormControlLabel
                  control={<Radio />}
                  style={{ marginBottom: '0px' }}
                  label="Porcentagem"
                  checked={config.showPercentage}
                  disabled={!canShowMale}
                  onChange={() => updateConfigs(false, !config.showPercentage)}
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  )
}

export default Chart
