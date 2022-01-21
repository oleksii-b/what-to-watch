/// <reference path="../../../types/user.d.ts" />
import {createReducer, isAnyOf} from '@reduxjs/toolkit'
import action from '../actions'

type State = {
  data: User.Data,
  isLoaded: boolean,
  error: User.Error,
}

const {
  createUser,
  setUser,
  signIn,
  signOut,
  setUserError,
  clearUserError,
} = action

const initialState: State = {
  data: null,
  isLoaded: false,
  error: {
    username: ``,
    password: ``,
  },
}

const user = createReducer(initialState, function (builder) {
  builder.addCase(
    // @ts-ignore
    setUser,
    // @ts-ignore
    (state: State, {payload}): State => {
      return {
        ...state,
        data: payload || null,
        isLoaded: true,
      }
    }
  )

  builder.addCase(
    // @ts-ignore
    setUserError,
    // @ts-ignore
    (state: State, {payload}): State => {
      return {
        ...state,
        error: payload,
        isLoaded: true,
      }
    }
  )

  builder.addCase(
    // @ts-ignore
    clearUserError,
    (state: State): State => {
      return {
        ...state,
        error: initialState.error,
        isLoaded: true,
      }
    }
  )

  builder.addMatcher(
    // @ts-ignore
    isAnyOf(createUser, signIn, signOut),
    (state: State): State => {
      return {
        ...state,
        isLoaded: false,
      }
    }
  )
})

export default user
