import Link from 'next/link'
import {FC, memo} from 'react'
import {compose} from 'redux'
import {useDispatch} from 'react-redux'
import {Button, Menu} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'
import {Route, AccountRoute} from '../../../../config'
import {user} from '../../../../store'
import styles from './Items.module.scss'

const {signOut} = user.action

const Items: FC = function () {
  const dispatch = useDispatch()

  const handleSignOut = function () {
    dispatch(signOut())
  }

  return (
    <>
      {Object.keys(AccountRoute).map((key: string): JSX.Element => (
        <Menu.Item key={key}>
          <Link href={`${Route.Account}${AccountRoute[key]}`}>
            <a>{key}</a>
          </Link>
        </Menu.Item>
      ))}

      <Menu.Divider />

      <Menu.Item key="SignOut">
        <Button
          type="text"
          size="small"
          className={styles.LogoutButton}
          icon={<LogoutOutlined />}
          onClick={handleSignOut}
          block
        >
          Sign out
        </Button>
      </Menu.Item>
    </>
  )
}

export default compose(memo)(Items)
