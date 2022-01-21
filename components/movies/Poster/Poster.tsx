import {FC} from 'react'
import cx from 'classnames'
import {PictureOutlined} from '@ant-design/icons'
import styles from './Poster.module.scss'

interface IProps {
  path: string | null
  title: string
  size: 'sm' | 'lg'
  className?: string
}

const Poster: FC<IProps> = function ({className, path, size, title}) {
  const imageClassName = cx([`img-fluid`, styles.Image, className && className])

  if (path) {
    let src = null
    let width = null
    let height = null

    if (size === 'sm') {
      src = `https://www.themoviedb.org/t/p/w220_and_h330_face/${path}`
      width = 220
      height = 330
    }

    if (size === 'lg') {
      src = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${path}`
      width = 300
      height = 450
    }

    return (
      <img
        className={imageClassName}
        src={src}
        width={width}
        height={height}
        alt={title}
      />
    )
  }

  return (
    <div className={imageClassName}>
      <div className={cx(styles.Backdrop)} />

      <PictureOutlined
        className={styles.Image__Icon}
      />
    </div>
  )
}

export default Poster
