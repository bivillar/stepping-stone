import React, { FC, useState, useEffect } from 'react'
import Logo from '../../components/Logo'
import GradYear from '../../components/charts/GradYear'
import useVisible from '../../components/hooks/useVisible'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

const Title: FC<Props> = ({ setShowSmallTitle, showSmallTile }) => {
  const [isVisible, setRef] = useVisible()
  const [fontSize, setFontSize] = useState<number>(90)

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y > -230) {
      setFontSize(90 + (currPos.y - (currPos.y % 5)) / 5)
      if (showSmallTile) setShowSmallTitle(false)
    } else if (currPos.y < -230 && !showSmallTile) {
      setShowSmallTitle(true)
    }
  })

  return (
    <div
      ref={setRef as any}
      style={{ padding: '20% 10%' }}
      className="fillPage w-100 flex justify-content-between">
      <div
        className={`self-start fade-in-section ${
          isVisible ? 'is-visible' : ''
        }`}>
        {!showSmallTile && <Logo fontSize={fontSize} />}
      </div>
      <div className="self-end">{isVisible && <GradYear />}</div>
    </div>
  )
}

interface Props {
  showSmallTile: boolean
  setShowSmallTitle: (show: boolean) => void
}

export default Title
