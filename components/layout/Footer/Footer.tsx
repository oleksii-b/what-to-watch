import {FC} from 'react'
import styles from './Footer.module.scss'

const Footer: FC = function () {
  return (
    <footer className={styles.PageFooter}>
      <div className={styles.Copyright}>
        © {new Date().getFullYear()} What to Watch Ltd.
      </div>
    </footer>
  )
}

export default Footer
