
import {NextPage} from 'next'
import Head from 'next/head'
import {Layout} from '../../components'

const Watchlist: NextPage = function () {
  return (
    <>
      <Head>
        <title>Account | Watchlist</title>
      </Head>

      <Layout.Page title="Watchlist">
        <div className="container">
          Watchlist is empty
        </div>
      </Layout.Page>
    </>
  )
}

export default Watchlist
