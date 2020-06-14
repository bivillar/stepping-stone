import React, { FC, useState, useEffect } from 'react'
import TableItemSkeleton from '../TableItemSkeleton'
import Button from '../Button'
import { Table, InputGroup } from 'react-bootstrap'
import BooleanIcon from '../BooleanIcon'
import TextTableItem from './TextsTableItem'
import Firebase from '../../utils/firebase/base'

const TextsTable: FC<Props> = ({
  loading,
  texts,
  selectedIds: selectedIdsInitial = [],
  title,
  fieldName,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedIdsInitial)
  const [saveLoading, setSaveLoading] = useState<boolean>(false)

  useEffect(() => setSelectedIds(selectedIdsInitial), [selectedIdsInitial])

  const handleCheck = (id: string, selected: boolean) => {
    let select = selected
    const ids = selectedIds
    if (!selected && ids.length < 6) {
      ids.push(id)
      select = true
    } else if (selected) {
      ids.filter((value) => id != value)
      select = false
    }
    setSelectedIds(ids)
    return select
  }

  const handleSave = () => {
    setSaveLoading(true)
    const base = new Firebase()
    base.saveSelected(fieldName, selectedIds).then(() => {
      setSaveLoading(false)
      setIsEditing(false)
    })
  }

  return (
    <>
      <div className="flex justify-between items-center pv3">
        <h5>{title}</h5>
        {isEditing ? (
          <Button isLoading={saveLoading} onClick={handleSave}>
            Salvar
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Editar</Button>
        )}
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th className="w-90">Texto</th>
            <th className="w-10 tc">
              <div>Selecionado</div>
              <div className="small">max: 6</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <TableItemSkeleton nCol={2} nRow={5} />
          ) : !!texts?.length ? (
            texts.map((text) => (
              <TextTableItem
                key={text.id}
                onCheck={handleCheck}
                isEditing={isEditing}
                text={text}
                initialSelected={selectedIds.includes(text.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={2}>
                <div className="tc pv3 b--light-gray">Nenhuma resposta</div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

interface Props {
  loading: boolean
  texts?: Text[]
  selectedIds?: string[]
  title: string
  fieldName: string
}

export default TextsTable
