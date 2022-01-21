/// <reference path="../../types/movie.d.ts" />
import {NextPage, GetServerSideProps} from 'next'
import Head from 'next/head'
import {Layout, Movies, Movie} from '../../components'
import {getMovie, getSimilarMovies} from '../../services/movies'

interface IProps {
  movie: Movie.Details
  similarMovies: Array<Movie.Poster>
}

const getServerSideProps: GetServerSideProps = async function (context) {
  const {id} = context.params
  const [movie, similarMovies] = await Promise.all([getMovie(id), getSimilarMovies(id)])

  return {
    props: {
      movie,
      similarMovies: similarMovies.results,
    },
  }
}

const Film: NextPage<IProps> = function (props) {
  const {movie, similarMovies} = props
  const maxSimilarMoviesNumber = 12

  if (similarMovies.length > maxSimilarMoviesNumber) {
    similarMovies.length = maxSimilarMoviesNumber
  }

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>

      <Layout.Page title={`«${movie.original_title}»`}>
        <Movie.Details
          data={movie}
        />

        <section className="container">
          <h2>
            Movies like this
          </h2>

          <hr />

          <Movies
            data={similarMovies}
          />
        </section>
      </Layout.Page>
    </>
  )
}

export default Film
export {getServerSideProps}
