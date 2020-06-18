import React, { FC } from 'react'

import GradYear from '../charts/TitleAreaChart'
import useVisible from '../../utils/useVisible'

const Title: FC = () => {
  const [isVisible, setRef] = useVisible()
  return (
    <div ref={setRef as any} className="homeBlocks title">
      <div
        className={`w-40-ns w-100-s fade-in-section ${
          isVisible ? 'is-visible' : ''
        }`}>
        <div className="subtitle">
          O número de mulheres se formando em computação na PUC-Rio está cada
          vez mais baixo. Este projeto tem como intuito incentivar mulheres a
          entrarem e se manterem no curso através de exemplos de mulheres que já
          se formaram.
        </div>
      </div>
      <div className="w-100-s h-50-s pt5 pl0 w-60-ns h-100-l pt0-ns pl5-l">
        {isVisible && <GradYear />}
      </div>
    </div>
  )
}

export default Title
