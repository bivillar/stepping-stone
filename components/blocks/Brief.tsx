import React, { FC } from 'react'
import {
  BsArrowDown as ArrowDown,
  BsBoxArrowUpRight as ExternalLinkArrow,
} from 'react-icons/bs'

import Container from '../Container'

const Brief: FC = () => {
  const handleClick = () =>
    window.scrollTo({
      top: 2 * window.innerHeight,
      behavior: 'smooth',
    })
  return (
    <Container>
      <div className="fw1 mr5">
        <span className="f2 brief ">
          As informações exibidas foram coletadas através de um formulário
          distribuido à ex-alunas do Departamento de Informática da PUC-Rio e
          são apenas resultados parciais.
        </span>
        <div className="flex items-start f3 mt6">
          <div className="w-33 h-100 flex ">
            <a
              className="flex justify-center pointer link"
              href="https://forms.gle/mt4DqdnMSewy2GSGA"
              target="_blank">
              <div className="pr2 f4 flex items-center">
                <ExternalLinkArrow />
              </div>
              Preencher formulário
            </a>
          </div>
          <div
            className="w-33 flex flex-column items-center pointer link"
            onClick={handleClick}>
            Ver resuldados parciais
            <div>
              <ArrowDown />
            </div>
          </div>
          <div className="w-33"></div>
        </div>
      </div>
    </Container>
  )
}

export default Brief
