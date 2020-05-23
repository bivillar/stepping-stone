import React, { FC } from 'react'

import GradYear from '../../components/chart/GradYear'
import useVisible from '../../utils/hooks/useVisible'

const Title: FC = () => {
  const [isVisible, setRef] = useVisible()

  return (
    <div ref={setRef as any} className="title">
      <div
        className={`self-start fade-in-section ${
          isVisible ? 'is-visible' : ''
        }`}>
        <div style={{ paddingTop: '30%' }} className="subtitle">
          O número de mulheres se formando em computação na PUC está cada fez
          mais baixo, como mostra o gráfico ao lado. Este projeto tem como
          intuito incentivar mulheres a entrarem e se materem no curso através
          de exemplos de mulheres que já se formaram.
        </div>
      </div>
      <div className="self-end">{isVisible && <GradYear />}</div>
    </div>
  )
}

export default Title
