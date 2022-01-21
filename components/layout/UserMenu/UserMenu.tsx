import Link from 'next/link'
import {FC, useState, useCallback, memo} from 'react'
import {compose} from '@reduxjs/toolkit'
import {useSelector, RootStateOrAny} from 'react-redux'
import {Button} from 'antd'
import {Route} from '../../../config'
import Modal from './Modal'
import styles from './UserMenu.module.scss'

const UserMenu: FC = function () {
  const user = useSelector((state: RootStateOrAny) => state.user)
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false)

  const handleSignInShow = useCallback(function () {
    setIsSignInModalVisible(true)
  }, [])

  const handleSignInHide = useCallback(function () {
    setIsSignInModalVisible(false)
  }, [])

  return (
    <>
      {!user.data && (
        <div className={styles.Menu}>
          <Button
            className={styles.Menu__Item}
            type="primary"
            size="large"
            onClick={handleSignInShow}
          >
            Sign In
          </Button>

          <Link href={Route.SignUp}>
            <a className={`${styles.Menu__Item} ant-btn ant-btn-lg`}>
              Sign Up
            </a>
          </Link>
        </div>
      )}

      <Modal.SignIn
        isVisible={isSignInModalVisible}
        onCancel={handleSignInHide}
      />
    </>
  )
}

export default compose(memo)(UserMenu)
