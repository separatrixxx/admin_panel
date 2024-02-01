import Head from 'next/head'
import { Inter } from 'next/font/google'
import { MainPage } from '../../page_components/MainPage/MainPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin panel</title>
        <meta name="description" content="Admin panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <MainPage />
    </>
  )
}
