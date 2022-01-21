import {NextPage} from 'next'
import Head from 'next/head'
import {Layout, Account} from '../components'

const SignUp: NextPage = function () {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Layout.Page title="Sign Up">
        <div className="container">
          <Account.SignUpForm />
        </div>
      </Layout.Page>
    </>
  )
}

export default SignUp
