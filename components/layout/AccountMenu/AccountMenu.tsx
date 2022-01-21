import {FC, SFC} from 'react'
import {DownOutlined} from '@ant-design/icons'
import {Menu, Dropdown} from 'antd'
import cx from 'classnames'
import {Title} from './Title'
import {Items} from './Items'
import styles from './AccountMenu.module.scss'

type TComponent<TProps> = SFC<TProps> & {
  Title?: FC<object>
  Items?: FC<object>
}

const AccountMenu: TComponent<{}> = function () {
  const menu = (
    <Menu>
      <Items />
    </Menu>
  )

  return (
    <Dropdown
      overlay={menu}
      placement="bottomRight"
      arrow
    >
      <div className={cx([styles.Link, 'ant-dropdown-link'])}>
        <Title />

        <DownOutlined className={styles.Arrow} />
      </div>
    </Dropdown>
  )
}

AccountMenu.Title = Title
AccountMenu.Items = Items

export default AccountMenu
