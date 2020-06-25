import React, { FC, useState, useEffect } from 'react'

import TableItemSkeleton from '../TableItemSkeleton'
import Button from '../Button'
import TextTableItem from './TextsTableItem'
import Firebase from '../../utils/firebase/base'
import { MAX_TEXTS } from '../../utils/constants'

const TextsTable: FC<Props> = ({
  loading,
  texts,
  selectedTexts: selectedTextsInitial,
  title,
  fieldName,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedTexts, setSelectedTexts] = useState<FieldText[]>([])
  const [saveLoading, setSaveLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!loading && selectedTextsInitial) {
      const {
        selectedIds: dataSelectedIds,
        texts: dataTexts,
      } = selectedTextsInitial
      setSelectedIds(dataSelectedIds ?? [])
      setSelectedTexts(dataTexts ?? [])
    }
  }, [selectedTextsInitial, loading])

  const handleCheck = (text: FieldText, selected: boolean) => {
    if (!selected && selectedIds.length >= MAX_TEXTS) return selected
    let ids = selectedIds
    let texts = selectedTexts
    if (!selected) {
      ids.push(text.id)
      texts.push(text)
    } else {
      ids = ids.filter((value) => text.id !== value)
      texts = texts.filter(({ id: value }) => text.id !== value)
    }
    setSelectedIds(ids)
    setSelectedTexts(texts)

    return !selected
  }

  const handleSave = () => {
    setSaveLoading(true)
    const base = new Firebase()

    base.saveSelected(fieldName, selectedIds, selectedTexts).then(() => {
      setSaveLoading(false)
      setIsEditing(false)
    })
  }

  return (
    <>
      <div className="flex justify-between items-end pt3 pb4 ph1">
        <h5>{title}</h5>
        {isEditing ? (
          <Button isLoading={saveLoading} onClick={handleSave}>
            Salvar
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Editar</Button>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-fixed">
          <thead>
            <tr>
              <th>Texto</th>
              <th className="tc">
                <div className="w-100">Selecionado</div>
                <div className="small w-100">max: {MAX_TEXTS}</div>
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
                  checkDisabled={selectedIds.length >= MAX_TEXTS}
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
        </table>
      </div>
    </>
  )
}

interface Props {
  loading: boolean
  texts?: FieldText[]
  selectedTexts?: Selected
  title: string
  fieldName: TextFieldKey
}

export default TextsTable
