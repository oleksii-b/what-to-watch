import {put, call} from 'redux-saga/effects'
import action from '../actions'
import {moviesService} from '../../../services'

function* loadMovies({payload}: ReturnType<typeof action.loadMovies>) {
  try {
    const {category, page} = payload
    const movies = yield call(moviesService.getMovies, category, page)

    yield put(action.addMovies(movies))
  } catch (err) {
    console.log(err.toString())
  }
}

export default loadMovies
