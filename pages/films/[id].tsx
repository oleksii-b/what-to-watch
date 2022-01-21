/// <reference path="../../types/movie.d.ts" />
import {NextPage, GetServerSideProps} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {compose} from '@reduxjs/toolkit'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {FilmGroup} from '../../config'
import {Layout, Movies} from '../../components'
import {LoadMoreButton} from '../../components/shared'
import {withPageNumber} from '../../components/hocs'
import {getMovies} from '../../services/movies'
import {movies} from '../../store'

interface IProps extends withPageNumber.Props {
  group: string
  movies: {
    results: Array<Movie.Poster>
    page: number
    total_pages: number
  }
}

const {addMovies, clearMovies, loadMovies} = movies.action

const getServerSideProps: GetServerSideProps = async function (context) {
  const {id} = context.params
  const group = Object.keys(FilmGroup).find((group) => FilmGroup[group] === id)

  const movies = await getMovies(id as string)

  return {
    props: {
      group,
      movies,
    },
  }
}

const FilmsGroup: NextPage<IProps> = function (props) {
  const {group, currentPage, setCurrentPage, clearCurrentPage} = props
  const movies = useSelector((state: RootStateOrAny) => state.movies)
  const dispatch = useDispatch()
  const {query} = useRouter()
  const data = movies.data ? movies.data.flat() : props.movies.results
  const totalPages = props.movies.total_pages
  const isLoadMoreButtonVisible = currentPage < totalPages

  useEffect(function () {
    dispatch(addMovies(props.movies))
  }, [])

  useEffect(function () {
    dispatch(clearMovies())
    clearCurrentPage()
  }, [
    query.id
  ])

  useEffect(function () {
    dispatch(loadMovies({
      category: FilmGroup[group],
      page: currentPage,
    }))
  }, [
    currentPage
  ])

  const updateCurrentPage = function (): void {
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <Head>
        <title>{group} movies</title>
      </Head>

      <Layout.Page title={group}>
        <Movies data={data} />

        <div className="container">
          <LoadMoreButton
            isVisible={isLoadMoreButtonVisible}
            onClick={updateCurrentPage}
          />
        </div>
      </Layout.Page>
    </>
  )
}

export default compose(withPageNumber.default)(FilmsGroup)
export {getServerSideProps}
