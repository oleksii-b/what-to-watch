import {NextPage} from 'next'
import {AppProps} from 'next/app'
import {useEffect, memo} from 'react'
import {compose} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import userbase from 'userbase-js'
import store, {user} from '../store'
import {withAuth} from '../components/hocs'
import '../scripts/wdyr'
import '../styles/index.scss'

const {setUser} = user.action

const App: NextPage<AppProps> = function ({Component, pageProps}) {
  const EnhancedComponent = compose(withAuth.default, memo)(Component)

  useEffect(function () {
    (async function () {
      const response = await userbase.init({
        appId: '175a2c13-2604-4c05-a108-9af5c410cb0b',
      })

      const user = response.user || null

      store.dispatch(setUser(user))
    }())
  }, [])

  EnhancedComponent.whyDidYouRender = true

  return (
    <Provider store={store}>
      <EnhancedComponent {...pageProps} />
    </Provider>
  )
}

export default App
