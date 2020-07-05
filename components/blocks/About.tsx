import React, { FC } from 'react'
import Link from 'next/link'

import biancaImg from '../../public/bianca.jpeg'
import marcosImg from '../../public/marcos.jpeg'
import github from '../../public/github.jpg'
import { COLORS } from '../../utils/constants'

const About: FC<Props> = ({}) => (
  <div className="w-100 ph4">
    <div className="w-100 flex-m dn-s">
      <div className="w-60 ">
        <h2 className="pb4 fw1 pr3">
          Projeto desenvolvido como Trabalho Final do curso de Engenharia da
          Computação da PUC-Rio.
        </h2>
        <h3 className="pb1  fw1">Desenvolvido por</h3>
        <div className="pb4 flex items-center">
          <img
            src={biancaImg}
            style={{
              borderRadius: '100%',
            }}
            width={50}
          />
          <div className="pl3 fw1 f4">
            <a
              target="_blank"
              style={{ color: COLORS[5] }}
              href="https://www.linkedin.com/in/bvillar/">
              Bianca Villar
            </a>
          </div>
        </div>
        <h3 className="pb1  fw1">Orientador</h3>
        <div className="pb4  flex items-center">
          <img
            src={marcosImg}
            style={{
              borderRadius: '100%',
            }}
            width={50}
          />
          <div className="pl3 fw1 f4">
            <a
              target="_blank"
              style={{ color: COLORS[5] }}
              href="http://www-di.inf.puc-rio.br/~kalinowski">
              Marcos Kalinowski
            </a>
          </div>
        </div>
      </div>
      <div className="w-40 db-m dn-s">
        <iframe
          src="https://drive.google.com/file/d/1CYOpxhyDJJU1ySDx5RRt3kk_vh65jSZ3/preview"
          width="512"
          height="384"></iframe>
      </div>
    </div>
    <div className="w-100 db-s dn-m">
      <div className="pb4 fw1">
        Projeto desenvolvido como Trabalho Final do curso de Engenharia da
        Computação da PUC-Rio.
      </div>
      <div className="pb1 fw1">Desenvolvido por</div>
      <div className="pb4 flex items-center">
        <img
          src={biancaImg}
          style={{
            borderRadius: '100%',
          }}
          width={50}
        />
        <div className="pl3 fw1">
          <a
            target="_blank"
            style={{ color: COLORS[5] }}
            href="https://www.linkedin.com/in/bvillar/">
            Bianca Villar
          </a>
        </div>
      </div>
      <div className="pb1 fw1">Orientador</div>
      <div className="pb4 flex items-center">
        <img
          src={marcosImg}
          style={{
            borderRadius: '100%',
          }}
          width={50}
        />
        <div className="pl3 fw1">
          <a
            target="_blank"
            style={{ color: COLORS[5] }}
            href="http://www-di.inf.puc-rio.br/~kalinowski">
            Marcos Kalinowski
          </a>
        </div>
      </div>
    </div>
    <div className="w-100 flex items-center justify-center pt4">
      <a
        target="_blank"
        className="f3 fw1"
        style={{ color: 'white' }}
        href="https://github.com/bivillar/stepping-stone">
        Stepping Stone
        <img
          src={github}
          style={{
            borderRadius: '100%',
          }}
          width={50}
        />
      </a>
    </div>
  </div>
)

interface Props {}

export default About
