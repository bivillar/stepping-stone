import { useEffect, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import Firebase from '../utils/firebase/base'
import Logo from '../components/Logo'
import Title from '../components/blocks/Title'

import Degree from '../components/blocks/Degree'
import Motive from '../components/blocks/Motive'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Menu from '../components/Menu'
import Container from '../components/Container'
import Role from '../components/blocks/Role'
import Company from '../components/blocks/Company'
import Satisfaction from '../components/blocks/Satisfaction'
import Brief from '../components/blocks/Brief'
import Texts from '../components/blocks/Texts'
import Salary from '../components/blocks/Salary'
import LogoDI from '../components/LogoDI'
import About from '../components/blocks/About'
import { CHART_BLOCKS } from '../utils/constants'

const getHiddenComponents = (totalizers: Totalizers) => {
  const hiddenComponents: string[] = []

  CHART_BLOCKS.forEach(({ name, components }) => {
    if (typeof totalizers[name] == 'undefined') {
      components.forEach((component) => {
        if (!hiddenComponents.includes(component)) {
          hiddenComponents.push(component)
        }
      })
    }
  })
  return hiddenComponents
}

const EMPTY_PAGES: BlocksOptions[] = [
  { menu: 'Home', showMobile: true },
  { menu: 'Início', showMobile: true },
  {
    Block: About,
    menu: 'Sobre',
    title: 'Sobre o projeto',
    showMobile: true,
  },
]

const PAGES: BlocksOptions[] = [
  { menu: 'Home', showMobile: true },
  { menu: 'Início', showMobile: true },
  { Block: Degree, menu: 'Formação', title: 'Formação', showMobile: true },
  {
    Block: Texts,
    menu: 'Sugestões',
    title: 'Sugestões de Curso',
    showMobile: false,
    textField: 'degreeSuggestion',
  },
  {
    Block: Motive,
    menu: 'Motivos',
    title: 'Motivos',
    showMobile: true,
  },
  {
    Block: Role,
    menu: 'Cargo',
    title: 'Colocação',
    showMobile: true,
  },
  {
    Block: Company,
    menu: 'Empresas',
    title: 'Empresas',
    showMobile: true,
  },
  {
    Block: Satisfaction,
    menu: 'Satisfação',
    title: 'Grau de Satisfação',
    showMobile: true,
  },
  {
    Block: Salary,
    menu: 'Faixa salarial',
    title: 'Faixa salarial',
    showMobile: true,
  },
  {
    Block: Texts,
    menu: 'Desafios',
    title: 'Desafios enfrentados',
    showMobile: false,
    textField: 'challenge',
  },
  {
    Block: Texts,
    menu: 'Conselhos',
    title: 'Conselhos',
    showMobile: false,
    textField: 'advice',
  },
  {
    Block: Texts,
    menu: 'Pontos positivos',
    title: 'Pontos positivos',
    showMobile: false,
    textField: 'pros',
  },
  {
    Block: Texts,
    menu: 'Pontos negativos',
    title: 'Pontos negativos',
    showMobile: false,
    textField: 'cons',
  },
  {
    Block: About,
    menu: 'Sobre',
    title: 'Sobre o projeto',
    showMobile: true,
  },
]

const Home = ({ data, dataError }: Props) => {
  const [fixed, setFixed] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [position, setPosition] = useState<number>(0)

  const [totalizers, setTotalizers] = useState<Totalizers>()
  const [pages, setPages] = useState<BlocksOptions[]>(PAGES)

  useEffect(() => {
    setTotalizers(data.totalizers)
    setError(dataError)

    const { hiddenTexts } = data
    const hiddenComponents = getHiddenComponents(data.totalizers)
    const filteredPages =
      !!hiddenTexts?.length || !!hiddenComponents?.length
        ? PAGES.filter(
            ({ textField, menu }) =>
              !(textField && hiddenTexts.includes(textField)) &&
              !(menu && hiddenComponents.includes(menu))
          )
        : PAGES

    setPages(
      Object.keys(data.totalizers).length === 0 ? EMPTY_PAGES : filteredPages
    )
    setLoading(false)
  }, [data, dataError])

  useScrollPosition(({ currPos }) => {
    if (currPos.y < -200 && !fixed) setFixed(true)
    else if (currPos.y > -200 && fixed) setFixed(false)

    const pos = Math.floor(
      (-currPos.y + window.innerHeight * 0.5) / window.innerHeight
    )
    if (pos !== position) {
      setPosition(pos)
    }
  })

  if (loading) return <Loading />

  if (error || !data || !totalizers || totalizers === {}) return <Error />

  return (
    <div>
      <LogoDI />
      <div className={`logoDiv${fixed ? '--fixed' : ''}`}>
        <Logo />
      </div>
      <div className="flex-ns dn h-100 items-center justify-end fixed right-0 pr4-ns pr3">
        <Menu position={position} pages={pages} />
      </div>
      <Title {...data.gradProps} />
      <Brief />
      {pages.map(
        ({ Block, title, showMobile, menu, textField }) =>
          Block && (
            <Container
              key={title || menu}
              showMobile={showMobile}
              title={title ?? menu}>
              <Block
                {...(totalizers && { totalizers })}
                {...(textField && { field: textField })}
              />
            </Container>
          )
      )}
    </div>
  )
}

Home.getInitialProps = async () => {
  const base = new Firebase()
  const data = await base.getData()
  return { data }
}

interface Props {
  dataError: any
  data: {
    totalizers: Totalizers
    hiddenTexts: string[]
    hiddenComponents: string[]
    gradProps: { grads: ChartData[]; config: GradChartConfig }
  }
}

export default Home
