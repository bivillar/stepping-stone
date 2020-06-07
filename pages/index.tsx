import Head from 'next/head'
import { Component, FC, useEffect, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import Firebase from '../utils/base'
import Logo from '../components/Logo'
import Title from '../components/blocks/Title'

import '../styles/styles.scss'
import Degree from '../components/blocks/Degree'
import Suggestions from '../components/blocks/Suggestions'
import Motive from '../components/blocks/Motive'
import InField from '../components/blocks/InField'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Menu from '../components/Menu'

const Header = () => (
  <Head>
    <title>Stepping Stone</title>
    <link rel="shortcut icon" href="/favicon.png" />
  </Head>
)

const PAGES = [
  { component: Title, title: 'Home' },
  { component: Degree, title: 'Formação' },
  { component: Suggestions, title: 'Sugestões' },
  { component: Motive, title: 'Motivos' },
  { component: InField, title: 'Área' },
]

const Home = ({ data }: Props) => {
  const [fixed, setFixed] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [position, setPosition] = useState<number>(0)

  const [inField, setInField] = useState<any[]>([])
  const [notInField, setNotInField] = useState<any[]>([])
  const [formEntries, setFormEntries] = useState<any[]>([])
  const [totalizers, setTotalizers] = useState<{}>({})

  useEffect(() => {
    setFormEntries(data.formEntries)
    setTotalizers(data.totalizers)
    setNotInField(data.notInField)
    setInField(data.inField)
    setLoading(false)
  }, [data])

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

  if (error || !data) return <Error />

  return (
    <div>
      <div className={`logoDiv${fixed ? '--fixed' : ''}`}>
        <Logo />
      </div>
      <div className="flex-ns dn h-100 items-center justify-end fixed right-0 pr4-ns pr3">
        <Menu position={position} pages={PAGES} />
      </div>
      <Title />
      <Degree totalizers={totalizers} />
      {/* <Suggestions totalizers={totalizers} /> */}
      <Motive totalizers={totalizers} />
      <InField totalizers={totalizers} />
    </div>
  )
}

Home.getInitialProps = async () => {
  const data = await Firebase.getData()
  return { data }
}

interface Props {
  data: {
    totalizers: Totalizers
    inField: FormEntry[]
    notInField: FormEntry[]
    formEntries: FormEntry[]
  }
}

export default Home
