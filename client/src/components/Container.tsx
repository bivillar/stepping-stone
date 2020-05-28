import React, { FC, CSSProperties } from 'react'
import useVisible from '../utils/hooks/useVisible'

const Container: FC<Props> = ({ style = {}, children, title }) => {
  const [isVisible, setRef] = useVisible()

  return (
    <div className="w-100 fillPage pv15 ph10" style={style}>
      {title && (
        <div className="header">
          <span>{title}</span>
        </div>
      )}
      <div ref={setRef as any} className="w-100 flex h-100">
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
