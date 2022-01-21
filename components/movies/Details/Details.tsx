/// <reference path="../../../types/movie.d.ts" />
import {FC} from 'react'
import cx from 'classnames'
import {Poster} from '../Poster'
import {Title} from './Title'
import styles from './Details.module.scss'

interface IProps {
  data: Movie.Details
}

const Details: FC<IProps> = function ({data}) {
  const {
    title,
    backdrop_path,
    poster_path,
    status,
    release_date,
    production_countries,
    original_language,
    genres,
    overview,
  } = data

  const generalDetails = [
    {
      name: `Status`,
      value: status,
    },
    {
      name: `Genres`,
      value: genres.map(({name}) => name).join(`, `),
    },
    {
      name: `Original language`,
      value: new Intl.DisplayNames([`en`], {type: `language`}).of(original_language),
    },
    {
      name: `Production ${production_countries.length > 1 ? `countries` : `country`}`,
      value: production_countries.map(({name}) => name).join(`, `),
    }
  ]

  return (
    <div className={styles.Movie}>
      <div
        className={styles.Backdrop}
        style={{
          background: `url(${`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`})`,
        }}
      />

      <section className={cx([styles.Movie__Details, `container`])}>
        <Title
          className={styles.Movie__Title}
          releaseDate={release_date}
        >
          {title}
        </Title>

        <Poster
          className={styles.Movie__Poster}
          path={poster_path}
          title={title}
          size="lg"
        />

        <div className={styles.Details}>
          <Title
            className={styles.MovieTitle}
            releaseDate={release_date}
          >
            {title}
          </Title>

          <div className={styles.Details__General}>
            <dl className={styles.DetailsList}>
              {generalDetails.map(({name, value}) => {
                if (Number.isInteger(value.length) && !value.length) {
                  return null
                }

                return (
                  <div
                    key={name}
                    className={styles.DetailsList__Item}
                  >
                    <dt>{name}:</dt>
                    <dd>{value}</dd>
                  </div>
                )
              })}
            </dl>

            {overview && (
              <article className={styles.Overview}>
                <h3>Overview:</h3>

                {overview}
              </article>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Details
