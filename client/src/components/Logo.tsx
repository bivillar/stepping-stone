import React, { FC } from 'react'

const Logo: FC<{ fontSize: number }> = ({ fontSize }) => (
  <div style={{ fontSize }} className="logo">
    <div>STEPPING</div>
    <div>STONE</div>
  </div>
)

export default Logo
