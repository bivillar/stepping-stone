import React, { FC, useEffect, useState, useRef } from 'react'
import { History } from 'history'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
// import ScrollSnap from 'scroll-snap'

import Logo from '../../components/Logo'
import Firebase from '../../base'
import Degree from './Degree'
import Title from './Title'
import Suggestions from './Suggestions'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import Motive from './Motive'
import InField from './InField'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  // const [ref, setRef] = useState<any>(null)
  const [fixed, setFixed] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const [inField, setInField] = useState<InFieldFormEntry[]>([])
  const [notInField, setNotInField] = useState<NotInFieldFormEntry[]>([])
  const [formEntries, setFormEntries] = useState<
    (InFieldFormEntry | NotInFieldFormEntry)[]
  >([])
  const [totalizers, setTotalizers] = useState<Map<string, any>>(new Map())

  useEffect(() => {
    window.scrollTo(0, 0)
    Firebase.getData()
      .then(receiveData)
      .catch(() => setError(true))
  }, [])

  // useEffect(() => {
  //   if (ref) {
  //     const element = ref.current
  //     new ScrollSnap(element, {
  //       snapDestinationY: '90%',
  //       time: true,
  //     })
  //   }
  // }, [ref])

  function receiveData(newData: {
    inField: InFieldFormEntry[]
    notInField: NotInFieldFormEntry[]
    totalizers: any
    formEntries: (InFieldFormEntry | NotInFieldFormEntry)[]
  }) {
    setFormEntries(newData.formEntries)
    setTotalizers(newData.totalizers)
    setNotInField(newData.notInField)
    setInField(newData.inField)
    setLoading(false)
  }

  useScrollPosition(({ currPos }) => {
    if (currPos.y < -200 && !fixed) setFixed(true)
    else if (currPos.y > -200 && fixed) setFixed(false)
  })

  if (loading) return <Loading />

  if (error) return <Error />

  return (
    <div className="homePage">
      <div className={`logoDiv${fixed ? '--fixed' : ''}`}>
        <Logo />
      </div>
      <div className="flex h-100 items-center justify-end fixed right-0 pr4">
        <ul className="guide">
          <li className="page">PAGE 1</li>
          <li className="page">PAGE 2</li>
          <li className="page">PAGE 3</li>
        </ul>
      </div>
      <Title />
      <Degree totalizers={totalizers} />
      <Suggestions totalizers={totalizers} />
      <Motive totalizers={totalizers} />
      <InField totalizers={totalizers} />
    </div>
  )
}

export default Home
