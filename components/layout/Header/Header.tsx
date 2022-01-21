import Link from 'next/link'
import {FC, useState} from 'react'
import {useSelector, RootStateOrAny} from 'react-redux'
import {Button} from 'antd'
import {MenuOutlined} from '@ant-design/icons'
import cx from 'classnames'
import {Route} from '../../../config'
import {MainMenu} from '../MainMenu'
import {AccountMenu} from '../AccountMenu'
import styles from './Header.module.scss'

const Header: FC = function () {
  const user = useSelector((state: RootStateOrAny) => state.user)
  const [isMenuVisible, setIsMenuVisible] = useState(true)

  const toggleMenu = function () {
    setIsMenuVisible(!isMenuVisible)
  }

  const handleMenuShow = function () {
    setIsMenuVisible(true)
  }

  return (
    <header className={styles.Header}>
      <div className={cx([styles.Header__Container, 'container'])}>
        <h1 className="visually-hidden">WTW</h1>

        <div className={styles.Title}>
          <div className={styles.Logo}>
            <Link href={Route.Home}>
              <a className={styles.Logo__Link}>
                <span className={styles.Logo__Letter}>W</span>
                <span className={styles.Logo__Letter}>T</span>
                <span className={styles.Logo__Letter}>W</span>
              </a>
            </Link>
          </div>

          <div className={styles.Title__Text}>
            <div>What</div>
            <div>to</div>
            <div>Watch</div>
          </div>
        </div>

        <div className={styles.MainMenu}>
          <MainMenu
            isVisible={isMenuVisible}
            onToggle={toggleMenu}
          />
        </div>

        {user.data && (
          <div className={styles.AccountMenu}>
            <AccountMenu />
          </div>
        )}

        <Button
          className={styles.HumburgerMenu}
          onClick={handleMenuShow}
        >
          <MenuOutlined className={styles.HumburgerMenu__Icon} />
        </Button>
      </div>
    </header>
  )
}

export default Header
