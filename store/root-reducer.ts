import {combineReducers} from '@reduxjs/toolkit'
import * as movies from './movies'
import * as user from './user'

const rootReducer = combineReducers({
  movies: movies.reducer,
  user: user.reducer,
})

export default rootReducer
