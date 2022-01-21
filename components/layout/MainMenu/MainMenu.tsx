import {FC, useState, useEffect} from 'react'
import {useSelector, RootStateOrAny} from 'react-redux'
import {Button} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import cx from 'classnames'
import {UserMenu} from '../UserMenu'
import {Menu} from './Menu'
import styles from './MainMenu.module.scss'

interface IProps {
  isVisible: boolean
  onToggle: () => void
}

let mediaQuery = null

if (typeof window !== 'undefined') {
  mediaQuery = window.matchMedia('(max-width: 768px)')
}

const MainMenu: FC<IProps> = function ({isVisible, onToggle}) {
  const user = useSelector((state: RootStateOrAny) => state.user)
  const [mode, setMode] = useState<'horizontal' | 'inline'>(null)
  const [isMediaSmall, setIsSmallMedia] = useState(null)

  useEffect(function () {
    if (!mediaQuery) {
      return
    }

    const isMediaSmall = mediaQuery && mediaQuery.matches

    setIsSmallMedia(isMediaSmall)

    if (isMediaSmall) {
      setMode('inline')
      onToggle()
    }

    if (!isMediaSmall) {
      setMode('horizontal')
    }
  }, [
    mediaQuery
  ])

  useEffect(function () {
    document.body.classList.toggle('overflow-hidden', isVisible && isMediaSmall)
  }, [
    isMediaSmall,
    isVisible
  ])

  useEffect(function () {
    const handleMediaChange = function () {
      if (!mediaQuery) {
        return
      }

      const isMediaSmall = mediaQuery.matches

      setIsSmallMedia(isMediaSmall)

      if (isMediaSmall) {
        setMode('inline')

        if (isVisible) {
          onToggle()
        }
      }

      if (!isMediaSmall) {
        setMode('horizontal')

        if (isVisible) {
          onToggle()
        }
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return function () {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [
    mediaQuery,
    isVisible
  ])

  return (
    <>
      <div
        className={cx({
          [styles.Backdrop]: true,
          [styles.Backdrop_m_Hidden]: !isVisible,
        })}
        onClick={onToggle}
      />

      <div
        className={cx({
          [styles.Menu]: true,
          [styles.Menu_m_Humburger]: isMediaSmall,
          [styles.Menu_m_Hidden]: !isVisible,
        })}
      >
        <Button
          type="text"
          className={styles.Menu__CloseButton}
          onClick={onToggle}
        >
          <CloseOutlined />
        </Button>

        <div className={styles.Menu__Container}>
          <Menu
            mode={mode}
            isMediaSmall={isMediaSmall}
            onToggle={onToggle}
          />

          {!user.data && (
            <UserMenu />
          )}
        </div>
      </div>
    </>
  )
}

export default MainMenu
