import {NextPage, GetServerSideProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import {compose} from '@reduxjs/toolkit'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {movies} from '../../store'
import {Route, FilmGroup} from '../../config'
import {Layout, Movies} from '../../components'
import {LoadMoreButton} from '../../components/shared'
import {withPageNumber} from '../../components/hocs'

interface IProps extends withPageNumber.Props {
  query: {
    q: string
  }
}

const {searchMovies, clearMovies} = movies.action

const getServerSideProps: GetServerSideProps = async function (context) {
  const {query} = context

  if (!query.q && query.q !== ``) {
    return {
      redirect: {
        destination: `${Route.Films}/${FilmGroup.Popular}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      query,
    },
  }
}

const Films: NextPage<IProps> = function (props) {
  const {currentPage, setCurrentPage, clearCurrentPage} = props
  const dispatch = useDispatch()
  const movies = useSelector((state: RootStateOrAny) => state.movies)
  const [query, setQuery] = useState(``)
  const data = movies.data && movies.data.flat()
  const isLoadMoreButtonVisible = currentPage < movies.totalPages

  useEffect(function () {
    if (props.query.q === query) {
      return
    }

    dispatch(clearMovies())
    setQuery(props.query.q)
    clearCurrentPage()

    dispatch(searchMovies({
      query: props.query.q,
      page: currentPage,
    }))
  }, [
    props.query.q
  ])

  useEffect(function () {
    if (!query) {
      return
    }

    dispatch(searchMovies({
      query,
      page: currentPage,
    }))
  }, [
    query,
    currentPage
  ])

  const updateCurrentPage = function (): void {
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <Head>
        <title>Films</title>
      </Head>

      <Layout.Page title="Search results">
        <div className="container">
          Total results: {props.query.q ? movies.total : 0}

          <hr />
        </div>

        {props.query.q && (
          <>
            <Movies data={data} />

            <div className="container">
              <LoadMoreButton
                isVisible={isLoadMoreButtonVisible}
                onClick={updateCurrentPage}
              />
            </div>
          </>
        )}
      </Layout.Page>
    </>
  )
}

export default compose(withPageNumber.default)(Films)
export {getServerSideProps}
