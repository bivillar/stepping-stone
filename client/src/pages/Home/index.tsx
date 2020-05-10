import React, { FC, useEffect, useState } from 'react'
import { History } from 'history'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import Title from './Title'
import Logo from '../../components/Logo'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  const [fixed, setFixed] = useState<boolean>(false)
  useEffect(() => window.scrollTo(0, 0), [])

  useScrollPosition(({ currPos }) => {
    if (currPos.y < -200 && !fixed) setFixed(true)
    else if (currPos.y > -200 && fixed) setFixed(false)
  })

  return (
    <>
      <div className={`logoDiv ${fixed ? 'fixed' : ''}`}>
        <Logo />
      </div>
      <Title />
      <div className="fillPage"></div>
    </>
  )
}

export default Home
