import {takeLatest} from 'redux-saga/effects'
import {ActionType} from '../actions'
import loadMovies from './load-movies'
import searchMovies from './search-movies'

function* watchMovies() {
  yield takeLatest(ActionType.LOAD_MOVIES, loadMovies)
  yield takeLatest(ActionType.SEARCH_MOVIES, searchMovies)
}

export default watchMovies
