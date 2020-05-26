import React, { FC } from 'react'
import useVisible from '../utils/hooks/useVisible'

const Container: FC = ({ children }) => {
  const [isVisible, setRef] = useVisible()

  return (
    <div className="homeContainer">
      <div ref={setRef as any} className="w-100 h-100">
        {isVisible && children}
      </div>
    </div>
  )
}

export default Container
