import {FC, ReactNode} from 'react'
import cx from 'classnames'
import {Header} from '../Header'
import {Footer} from '../Footer'
import {Search} from '../Search'
import styles from './Page.module.scss'

interface IProps {
  title: string
  children: ReactNode
}

const Page: FC<IProps> = function ({title, children}) {
  return (
    <>
      <Header />

      <div className={styles.PageHeader}>
        <div className={cx([styles.PageHeader__Container, `container`])}>
          <h2 className={styles.PageTitle}>
            {title}
          </h2>

          <div className={styles.Search}>
            <Search />
          </div>
        </div>
      </div>

      <main className={styles.PageContent}>
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Page
