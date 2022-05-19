// import fs from 'fs'
// import path from 'path'
import Link from 'next/link'
import { Nav } from '../component/Nav'
import getModelList from '../util/modelList'

export default function Home({ models }) {
  return (


    <div>
      <Nav models={models} />
    </div>

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