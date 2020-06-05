import Head from 'next/head'
import Firebase from '../utils/base'
import { Component, FC } from 'react'

const Home = ({ data }: Props) => {
  return <div>Next stars: {JSON.stringify(data)}</div>
}

Home.getInitialProps = async (ctx) => {
  const data = await Firebase.getData()
  console.log(data)
  return { data }
}

interface Props {
  data: any
}

export default Home
