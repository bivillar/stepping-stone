import React, { FC } from 'react'
import Logo from '../../components/Logo'
import GradYear from '../../components/charts/GradYear'
import useVisible from '../../components/hooks/useVisible'

const Title: FC<Props> = ({}) => {
  const [isVisible, setRef] = useVisible()

  return (
    <div
      ref={setRef as any}
      style={{ padding: '20% 10%' }}
      className="fillPage w-100 flex justify-content-between">
      <div
        className={`self-start fade-in-section ${
          isVisible ? 'is-visible' : ''
        }`}>
        <Logo />
      </div>
      <div className="self-end">{isVisible && <GradYear />}</div>
    </div>
  )
}

interface Props {}

export default Title
