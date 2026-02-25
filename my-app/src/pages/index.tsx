import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Praktikum Next.js</title>
        <meta name="description" content="Praktikum PBF Next.js Pages Router" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>Praktikum Next.js Pages Router</h1>
          <br />
          <p>Mahasiswa D4 Pengembangan Web</p>
        </div>
      </main>
    </>
  )
}