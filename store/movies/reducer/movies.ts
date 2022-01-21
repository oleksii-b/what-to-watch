/// <reference path="../../../types/movie.d.ts" />
import {createReducer} from '@reduxjs/toolkit'
import action from '../actions'

type State = {
  data: Array<Array<Movie.Poster>>
  total: number
  totalPages: number
}

const {
  addMovies,
  clearMovies,
} = action

const initialState: State = {
  data: null,
  total: 0,
  totalPages: 0,
}

const movies = createReducer(initialState, function (builder) {
  builder.addCase(
    // @ts-ignore
    addMovies,
    // @ts-ignore
    (state: State, {payload}): State => {
      const {results, page, total_results, total_pages} = payload
      const data = state.data ? [...state.data] : [null]

      data[page] = [...results]

      return {
        ...state,
        data,
        total: total_results,
        totalPages: total_pages,
      }
    }
  )

  builder.addCase(
    // @ts-ignore
    clearMovies,
    (state: State): State => {
      const {data, total, totalPages} = initialState

      return {...state, data, total, totalPages}
    }
  )
})

export default movies
