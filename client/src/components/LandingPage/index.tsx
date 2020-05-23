import React, { FC } from 'react'

import styles from './landingPage.module.css'

interface Props {}

const LandingPage: FC<Props> = ({}) => {
  return (
    <div
      className={`w-100 flex items-center justify-center ${styles.landingBox}`}>
      {/* <img className="" src={Image} /> */}
      <div className={styles.ball1} />
      <div className={styles.ball2} />
      <div className={styles.ball} />
    </div>
  )
}

export default LandingPage
