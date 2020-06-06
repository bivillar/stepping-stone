import Head from 'next/head'
import { Component, FC } from 'react'

import Firebase from '../utils/base'
import '../styles/styles.scss'

const Home = ({ data }: Props) => {
  return <div className="c-success">Next stars: {JSON.stringify(data)}</div>
}

Home.getInitialProps = async () => {
  const data = await Firebase.getData()
  console.log(data)
  return { data }
}

interface Props {
  data: any
}

export default Home
