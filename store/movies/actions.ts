/// <reference path="../../types/movie.d.ts" />
import {createAction} from '@reduxjs/toolkit'
import {commonService} from '../../services'

enum ActionType {
  LOAD_MOVIES = 'MOVIES/LOAD_MOVIES',
  ADD_MOVIES = 'MOVIES/ADD_MOVIES',
  CLEAR_MOVIES = 'MOVIES/CLEAR_MOVIES',
  SEARCH_MOVIES = 'MOVIES/SEARCH_MOVIES',
}

if (commonService.hasDuplicateValues(ActionType)) {
  throw 'ActionType enumeration has duplicate values'
}

type LoadMovies = (payload: {
  category: string
  page: number
}) => ({
  type: ActionType.LOAD_MOVIES
  payload: typeof payload
})

type AddMovies = (payload: {
  results: Array<Movie.Poster>
  page: number
  total_pages: number
}) => ({
  type: ActionType.ADD_MOVIES
  payload: typeof payload
})

type ClearMovies = () => ({
  type: ActionType.CLEAR_MOVIES
})

type SearchMovies = (payload: {
  query: string
  page?: number
}) => ({
  type: ActionType.SEARCH_MOVIES
  payload: typeof payload
})

const loadMovies: LoadMovies = createAction(ActionType.LOAD_MOVIES)
const addMovies: AddMovies = createAction(ActionType.ADD_MOVIES)
const clearMovies: ClearMovies = createAction(ActionType.CLEAR_MOVIES)
const searchMovies: SearchMovies = createAction(ActionType.SEARCH_MOVIES)

export default {
  loadMovies,
  addMovies,
  clearMovies,
  searchMovies,
}

export {ActionType}
