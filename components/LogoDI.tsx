import React, { FC } from 'react'
import logoDI from '../public/logo_di.png'

const LogoDI: FC = () => (
  <>
    <div className="tr absolute fixed w-100 dn-s db-m">
      <img
        src={logoDI}
        style={{
          paddingRight: '5%',
          paddingTop: '3%',
        }}
        width={264}
      />
    </div>
    <div className="tc absolute fixed w-100 dn-m db-s bottom-0">
      <img
        src={logoDI}
        style={{
          paddingRight: '5%',
          paddingTop: '2%',
          paddingBottom: '2%',
        }}
        width={190}
      />
    </div>
  </>
)

export default LogoDI
