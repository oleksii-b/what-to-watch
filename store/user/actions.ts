/// <reference path="../../types/user.d.ts" />
import {createAction} from '@reduxjs/toolkit'
import {commonService} from '../../services'

enum ActionType {
  CREATE_USER = 'USER/CREATE',
  SET_USER = 'USER/SET_DATA',
  SET_USER_ERROR = 'USER/SET_ERROR',
  CLEAR_USER_ERROR = 'USER/CLEAR_ERROR',
  SIGN_IN = 'USER/SIGN_IN',
  SIGN_OUT = 'USER/SIGN_OUT',
}

if (commonService.hasDuplicateValues(ActionType)) {
  throw 'ActionType enumeration has duplicate values'
}

type CreateUser = (payload: User.LoginCredentials & Pick<User.Data, 'email'>) => ({
  type: ActionType.CREATE_USER
  payload: typeof payload
})

type SetUser = (payload: User.Data) => ({
  type: ActionType.SET_USER
  payload: typeof payload
})

type SignIn = (payload: User.LoginCredentials) => ({
  type: ActionType.SIGN_IN
  payload: typeof payload
})

type SignOut = () => ({
  type: ActionType.SIGN_OUT
})

type SetUserError = (payload: User.Error) => ({
  type: ActionType.SET_USER_ERROR
  payload: typeof payload
})

type ClearUserError = () => ({
  type: ActionType.CLEAR_USER_ERROR
})

const createUser: CreateUser = createAction(ActionType.CREATE_USER)
const setUser: SetUser = createAction(ActionType.SET_USER)
const signIn: SignIn = createAction(ActionType.SIGN_IN)
const signOut: SignOut = createAction(ActionType.SIGN_OUT)
const setUserError: SetUserError = createAction(ActionType.SET_USER_ERROR)
const clearUserError: ClearUserError = createAction(ActionType.CLEAR_USER_ERROR)

export default {
  createUser,
  setUser,
  signIn,
  signOut,
  setUserError,
  clearUserError,
}

export {ActionType}
