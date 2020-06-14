import React from 'react'
import App from 'next/app'
import Head from 'next/head'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <div>
          <Head>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
            />
            <title>Stepping Stone</title>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>
        </div>
        <Component {...pageProps} />
      </div>
    )
  }
}
export default MyApp
