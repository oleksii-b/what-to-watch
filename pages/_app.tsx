import {AppProps} from 'next/app'
import {FC} from 'react'
import '../scripts/wdyr'

const App: FC<AppProps> = function ({Component, pageProps}) {
  return (
    <Component {...pageProps} />
  )
}

export default App
