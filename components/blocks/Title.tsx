import React, { FC } from 'react'

import GradYear from '../charts/TitleAreaChart'
import useVisible from '../../utils/useVisible'
import GradChart from '../charts/GradChart'

const Title: FC<Props> = ({ grads, config }) => {
  const [isVisible, setRef] = useVisible()
  return (
    <div ref={setRef as any} className="homeBlocks title">
      <div
        className={`w-40-ns w-100-s fade-in-section ${
          isVisible ? 'is-visible' : ''
        }`}>
        <div className="subtitle">
          Este projeto tem como intuito incentivar mulheres a entrarem e se
          manterem nos cursos de computação da PUC-Rio através de exemplos de
          mulheres que já se formaram.
        </div>
      </div>
      <div className="w-100-s h-50-s pt5 pl0 w-60-ns h-100-l pt0-ns pl5-l">
        {isVisible && <GradChart data={grads} config={config} />}
      </div>
    </div>
  )
}

interface Props {
  grads: ChartData[]
  config: GradChartConfig
}

export default Title
