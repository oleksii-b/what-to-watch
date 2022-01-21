
import {NextPage} from 'next'
import Head from 'next/head'
import {Layout} from '../../components'

const Favorites: NextPage = function () {
  return (
    <>
      <Head>
        <title>Account | Favorite films</title>
      </Head>

      <Layout.Page title="Favorites">
        <div className="container">
          Favorite films are absent
        </div>
      </Layout.Page>
    </>
  )
}

export default Favorites
