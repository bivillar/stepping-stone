import React, { useEffect, useState } from 'react'

import { useUser } from '../../utils/firebase/useUser'
import Firebase from '../../utils/firebase/base'
import AdminContainer from '../../components/AdminContainer'
import Table from '../../components/textsTable/TextsTable'

const Configs = ({}: Props) => {
  const [texts, setTexts] = useState<AllTexts>()
  const [selectedIds, setSelectedIds] = useState<SelectedIds>()
  const [loading, setLoading] = useState<boolean>(true)
  const { currentUser } = useUser()

  useEffect(() => {
    const base = new Firebase()
    base.getTexts().then((textsData) => {
      setTexts(textsData)
      base.getSelectedIdsByField().then((idsData) => {
        setSelectedIds(idsData)
        setLoading(false)
      })
    })
  }, [])

  return (
    <AdminContainer hasPermission={currentUser?.canConfig}>
      <div className="adminContainer">
        <h1>Gerenciar Textos</h1>
        <p>
          Aqui você pode selecionar quais textos irão aparecer. Caso nenhum
          esteja selecionado, a seção não aparecerá.
        </p>
        <div>
          <Table
            fieldName="degreeSuggestion"
            loading={loading}
            texts={texts?.degreeSuggestion}
            selectedIds={selectedIds?.degreeSuggestion}
            title={'Sugestão de Curso/ Graduação'}
          />
        </div>
      </div>
    </AdminContainer>
  )
}

interface Props {}

export default Configs
