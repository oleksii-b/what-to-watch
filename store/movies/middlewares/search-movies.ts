import {put, call} from 'redux-saga/effects'
import action from '../actions'
import {moviesService} from '../../../services'

function* searchMovies({payload}: ReturnType<typeof action.searchMovies>) {
  try {
    const movies = yield call(
      moviesService.searchMovies,
      payload.query,
      payload.page
    )

    yield put(action.addMovies(movies))
  } catch (err) {
    console.log(err.toString())
  }
}

export default searchMovies
