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
  // const [totalizers, setTotalizers] = useState<Map<string, any>>(new Map())

  // useEffect(() => {
  //   setFormEntries(data.formEntries)
  //   setTotalizers(data.totalizers)
  //   setNotInField(data.notInField)
  //   setInField(data.inField)
  //   setLoading(false)
  //   console.log(data.totalizers)
  // }, [data])

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

  const goToPosition = (pos: number) =>
    window.scrollTo({
      top: pos * window.innerHeight,
      behavior: 'smooth',
    })

  console.log(data)

  return (
    <div>
      <div className={`logoDiv${fixed ? '--fixed' : ''}`}>
        <Logo />
      </div>
      <div className="flex h-100 items-center justify-end fixed right-0 pr4">
        <ul className="guide h-100 flex items-end flex-column justify-center">
          {PAGES.map(({ title }, i) => {
            const current = i == position
            return (
              <li
                key={title}
                className={`page ${current ? 'current' : ''} tr pointer`}
                onClick={() => goToPosition(i)}>
                <span className={`text${current ? '--current' : ''}`}>
                  {title}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <Title />
      <Degree totalizers={data} />
      <Suggestions totalizers={data} />
      <Motive totalizers={data} />
      <InField totalizers={data} />
    </div>
  )
}

Home.getInitialProps = async () => {
  const data = await Firebase.getData()
  return { data }
}

interface Props {
  data: any
}

export default Home
