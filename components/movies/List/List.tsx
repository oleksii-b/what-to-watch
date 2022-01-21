/// <reference path="../../../types/movie.d.ts" />
import Link from 'next/link'
import {FC} from 'react'
import {Route} from '../../../config'
import {Poster} from '../Poster'
import styles from './List.module.scss'

interface IProps {
  data: Array<Movie.Poster>
}

const List: FC<IProps> = function ({data}) {
  if (!data) {
    return null
  }

  if (!data[0]) {
    data.shift()
  }

  return (
    <div className={styles.List}>
      {data.map(({id, title, poster_path}) => (
        <article
          key={id}
          className={styles.Card}
        >
          <div className={styles.Card__Image}>
            <Poster
              path={poster_path}
              title={title}
              size="lg"
            />
          </div>

          <h3 className={styles.Card__Title}>
            <Link href={`${Route.Film}/${id}`}>
              <a className={styles.Card__Link}>
                {title}
              </a>
            </Link>
          </h3>
        </article>
      ))}
    </div>
  )
}

export default List
