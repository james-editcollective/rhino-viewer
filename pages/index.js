import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import getModelList from '../util/modelList'

export default function Home({models}) {
  return (
    <Nav models={models} currentModel={null} />
  )
}


export const getStaticProps = async () => {
  const { models } = getModelList()
  return {
    props: {
      models
    }
  }
}