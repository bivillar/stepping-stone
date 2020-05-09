import React, { FC } from 'react'
import { History } from 'history'

import Container from '../../components/Container'
import Image from '../../static/images/stepping-stone.png'
import LandingPage from '../../components/LandingPage'
import Logo from '../../components/Logo'
import GradYear from '../../components/Charts/GradYear'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  return (
    <div
      style={{ padding: '20% 10%' }}
      className="fillPage w-100 flex justify-content-between">
      <div className="self-start">
        <Logo />
      </div>
      <div className="self-end">
        <GradYear />
      </div>
    </div>
  )
}

export default Home
