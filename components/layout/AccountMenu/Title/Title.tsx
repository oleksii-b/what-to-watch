import {FC} from 'react'
import {useSelector, RootStateOrAny} from 'react-redux'
import {UserOutlined} from '@ant-design/icons'
import styles from './Title.module.scss'

const Title: FC = function () {
  const user = useSelector((state: RootStateOrAny) => state.user)

  if (user.data) {
    const {username, email} = user.data

    return (
      <div className={styles.Title}>
        <UserOutlined className={styles.UserIcon} />

        <div>
          <div className={styles.Username}>
            {username}
          </div>

          {email}
        </div>
      </div>
    )
  }

  return null
}

export default Title
