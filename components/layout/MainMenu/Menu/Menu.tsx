import {useRouter} from 'next/router'
import Link from 'next/link'
import {FC, useState, useEffect} from 'react'
import {useSelector, RootStateOrAny} from 'react-redux'
import {Menu} from 'antd'
import {Route, FilmGroup} from '../../../../config'
import {AccountMenu} from '../../AccountMenu'
import styles from './Menu.module.scss'

interface IProps {
  isMediaSmall: boolean
  mode: 'horizontal' | 'inline'
  onToggle: () => void
}

const MainMenu: FC<IProps> = function ({mode, isMediaSmall, onToggle}) {
  const router = useRouter()
  const user = useSelector((state: RootStateOrAny) => state.user)
  const [selectedKeys, setSelectedKeys] = useState(null)
  const isAccountMenuVisible = user.data && isMediaSmall

  useEffect(function () {
    setSelectedKeys([router.pathname, router.asPath])

    const handleRouteChangeComplete = function (url) {
      setSelectedKeys([router.pathname, url])
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return function () {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [
    router.asPath
  ])

  return (
    <div className={styles.Menu}>
      <Menu
        mode={mode}
        selectedKeys={selectedKeys}
      >
        {isAccountMenuVisible && (
          <Menu.SubMenu
            key={Route.Account}
            className={styles.AccountMenu}
            title={<AccountMenu.Title />}
          >
            <AccountMenu.Items />
          </Menu.SubMenu>
        )}

        <Menu.SubMenu key={Route.Films} title="Movies">
          {Object.keys(FilmGroup).map((key: string): JSX.Element => {
            const href = `${Route.Films}/${FilmGroup[key]}`

            return (
              <Menu.Item key={href}>
                <Link
                  key={key}
                  href={href}
                >
                  <a onClick={onToggle}>{key}</a>
                </Link>
              </Menu.Item>
            )
          })}
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}

export default MainMenu
