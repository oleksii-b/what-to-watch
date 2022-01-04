import {AppProps} from 'next/app'
import {FC} from 'react'
import '../scripts/wdyr'
import '../styles/index.scss'

const App: FC<AppProps> = function ({Component, pageProps}) {
  return (
    <Component {...pageProps} />
  )
}

export default App
