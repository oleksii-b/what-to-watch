import {GetServerSideProps, NextPage} from 'next'
import {Route, FilmGroup} from '../config'

const getServerSideProps: GetServerSideProps = async function () {
  return {
    redirect: {
      destination: `${Route.Films}/${FilmGroup.Popular}`,
      permanent: false,
    },
  }
}

const Home: NextPage = function () {
  return null
}

export default Home
export {getServerSideProps}
