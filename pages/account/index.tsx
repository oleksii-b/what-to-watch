
import {NextPage} from 'next'
import Head from 'next/head'
import {Layout, Account} from '../../components'

const Profile: NextPage = function () {
  return (
    <>
      <Head>
        <title>Account | Profile</title>
      </Head>

      <Layout.Page title="Profile">
        <div className="container">
          <Account.Profile />
        </div>
      </Layout.Page>
    </>
  )
}

export default Profile
