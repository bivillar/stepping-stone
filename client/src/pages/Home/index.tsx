import React, { FC, useEffect, useState, useRef } from 'react'
import { History } from 'history'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import ScrollSnap from 'scroll-snap'
import { Spinner } from 'react-bootstrap'

import Logo from '../../components/Logo'
import Firebase from '../../base'
import Degree from './Degree'
import Title from './Title'
import Suggestions from './Suggestions'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  const [fixed, setFixed] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<{
    inField: InFieldFormEntry[]
    notInField: NotInFieldFormEntry[]
  } | null>(null)
  const [formEntries, setFormEntries] = useState<
    (InFieldFormEntry | NotInFieldFormEntry)[] | null
  >(null)
  const [ref, setRef] = useState<any>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    Firebase.getData()
      .then(receiveData)
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    if (ref) {
      const element = ref.current
      new ScrollSnap(element, {
        snapDestinationY: '90%',
        time: true,
      })
    }
  }, [ref])

  function receiveData(newData: {
    inField: InFieldFormEntry[]
    notInField: NotInFieldFormEntry[]
  }) {
    setData(newData)
    setFormEntries([...newData.inField, ...newData.notInField])
    setLoading(false)
  }

  useScrollPosition(({ currPos }) => {
    if (currPos.y < -200 && !fixed) setFixed(true)
    else if (currPos.y > -200 && fixed) setFixed(false)
  })

  return (
    <div ref={setRef as any}>
      {!formEntries ? (
        <>
          {loading && <Spinner animation="border" />}
          {error && <div>Error!</div>}
        </>
      ) : (
        <>
          <div className={`logoDiv ${fixed ? 'fixed' : ''}`}>
            <Logo />
          </div>
          <Title />
          <Degree formEntries={formEntries} />
          <Suggestions formEntries={formEntries} />
        </>
      )}
    </div>
  )
}

export default Home
