import React, { FC, useState, useEffect } from 'react'
import { Table, Alert } from 'react-bootstrap'
import { BsX as XIcon, BsPlus as PlusIcon } from 'react-icons/bs'

import { useUser } from '../../utils/firebase/useUser'
import Firebase from '../../utils/firebase/base'
import Button from '../../components/Button'
import AdminContainer from '../../components/AdminContainer'
import TableItemForm from '../../components/gradsTable/TableItemForm'
import TableItem from '../../components/gradsTable/TableItem'
import TableItemSkeleton from '../../components/TableItemSkeleton'

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

  const sortYears = (years: ChartData[]) => {
    return years.sort(({ year: A }, { year: B }) => A - B)
  }

  useEffect(() => {
    const base = new Firebase()
    base.getGradChartData().then(({ grads, config }) => {
      setYears(sortYears(grads))
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
    const percentage = male ? female / (male + female) : 0
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
  }

  const updateConfigs = (showMale: boolean, showPercentage: boolean) => {
    const base = new Firebase()
    setConfig({ showMale, showPercentage })
    base.updateGradCharConfig(showMale, showPercentage)
  }

  const deleteYear = (index: number) => {
    const removedYear = years?.[index].year
    const newYears = years?.filter(({ year }) => year !== removedYear)
    setYears(newYears)
  }

  return (
    <AdminContainer hasPermission={currentUser?.canManageUsers}>
      <div className="adminContainer">
        <h1>Gerenciar Gráfico de Mulheres Formadas por Ano</h1>

        <div className="w-50">
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}
          <Table responsive hover>
            <thead>
              <tr>
                <th className="w-30">Ano</th>
                <th className="w-30">Mulheres</th>
                <th className="w-30">Homens</th>
                <th>
                  <div className="pr2">
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
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
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
                  />
                ))
              )}
              {isAddingUser && <TableItemForm handleAddYear={handleAddYear} />}
            </tbody>
          </Table>
        </div>
        <div className="w-50"></div>
      </div>
    </AdminContainer>
  )
}

export default Chart
