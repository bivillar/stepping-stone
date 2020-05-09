import React, { FC, useEffect, useState } from 'react'
import { History } from 'history'

import Title from './Title'
import Logo from '../../components/Logo'

interface Props {
  history: History
}

const Home: FC<Props> = ({ history }) => {
  const [showSmallTile, setShowSmallTitle] = useState<boolean>(false)
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <>
      {showSmallTile && (
        <div className="fixed" style={{ padding: '3% 10%' }}>
          <Logo fontSize={44} />
        </div>
      )}
      <Title
        showSmallTile={showSmallTile}
        setShowSmallTitle={setShowSmallTitle}
      />
      <div className="fillPage"></div>
    </>
  )
}

export default Home
