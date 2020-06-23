import React, { useEffect, useState } from 'react'

import { useUser } from '../../utils/firebase/useUser'
import Firebase from '../../utils/firebase/base'
import AdminContainer from '../../components/AdminContainer'
import Table from '../../components/textsTable/TextsTable'
import { Tabs, Tab } from 'react-bootstrap'

interface TextTableConfig {
  field: TextFieldKey
  title: string
  menu: string
}

export const TEXTS: TextTableConfig[] = [
  {
    field: 'degreeSuggestion',
    title: 'Sugestão de Curso/ Graduação',
    menu: 'Sugestões',
  },
  { field: 'challenge', title: 'Desafios enfrentados', menu: 'Desafios' },
  {
    field: 'advice',
    title: 'Conselhos à uma mulher que está ingressando na área',
    menu: 'Conselhos',
  },
  {
    field: 'pros',
    title: 'Pontos positivos da área',
    menu: 'Pontos Positivos',
  },
  {
    field: 'cons',
    title: 'Pontos negativos da área',
    menu: 'Pontos Negativos',
  },
]

const Configs = ({}: Props) => {
  const [texts, setTexts] = useState<AllTexts>()
  const [selectedTexts, setSelectedTexts] = useState<SelectedTexts>()
  const [loading, setLoading] = useState<boolean>(true)
  const { currentUser } = useUser()

  useEffect(() => {
    const base = new Firebase()
    base.getTexts().then((textsData) => {
      setTexts(textsData)
      base.getSelectedTextsByField().then((selectedData) => {
        setSelectedTexts(selectedData)
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

        <Tabs defaultActiveKey="degreeSuggestion" id="uncontrolled-tab-example">
          {TEXTS.map(({ field, menu, title }) => (
            <Tab eventKey={field} title={menu} key={field}>
              <div className="pa4">
                <Table
                  fieldName={field}
                  loading={loading}
                  texts={texts?.[field]}
                  selectedTexts={!loading ? selectedTexts?.[field] : undefined}
                  title={title}
                />
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </AdminContainer>
  )
}

interface Props {}

export default Configs
