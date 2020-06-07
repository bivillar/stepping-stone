import React, { FC, CSSProperties } from 'react'
import useVisible from '../utils/useVisible'

const Container: FC<Props> = ({ style = {}, children, title }) => {
  const [isVisible, setRef] = useVisible()

  return (
    <div
      className={`w-100 fillPage homeBlocks ${
        title ? 'withTitle' : 'withoutTitle'
      }`}
      style={style}>
      {title && (
        <div className="header db">
          <span>{title}</span>
        </div>
      )}
      <div
        ref={setRef as any}
        className="w-100 flex h-100 items-center justify-center">
        {isVisible && children}
      </div>
    </div>
  )
}

interface Props {
  style?: CSSProperties
  title?: string
}

export default Container
