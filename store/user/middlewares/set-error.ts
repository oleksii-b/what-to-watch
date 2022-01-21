/// <reference path="../../../types/user.d.ts" />
import {put} from 'redux-saga/effects'
import action from '../actions'

enum Error {
  UsernameMustBeString = 'The field is required',
  UsernameCannotBeBlank = 'The field is required',
  UsernameAlreadyExists = 'Username already exists',
  UserNotFound = 'User not found',
  UsernameOrPasswordMismatch = 'Username or password mismatch',
  PasswordMustBeString = 'The field is required',
  PasswordTooShort = 'Passwords must be at least 6 characters',
  CurrentPasswordIncorrect = 'Current password is incorrect',
  EmailNotValid = 'Email is not valid',
}

function* setError({payload}: ReturnType<typeof action.setUserError>) {
  const [type] = payload.toString().split(': ')

  let error: User.Error = {}

  switch (type) {
    case 'UsernameOrPasswordMismatch':
      error.username = Error[type]
      error.password = Error[type]

      break
    case 'UsernameMustBeString':
    case 'UsernameCannotBeBlank':
    case 'UsernameAlreadyExists':
    case 'UserNotFound':
      error.username = Error[type]

      break
    case 'PasswordMustBeString':
    case 'PasswordTooShort':
      error.password = Error[type]

      break
    case 'CurrentPasswordIncorrect':
      error.currentPassword = Error[type]

      break
    case 'EmailNotValid':
      error.email = Error[type]

      break
    default:
      console.log(payload.toString())
  }

  yield put(action.setUserError(error))
}

export default setError
