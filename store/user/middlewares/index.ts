import {takeLatest, takeLeading} from 'redux-saga/effects'
import {ActionType} from '../actions'
import signUp from './sign-up'
import signIn from './sign-in'
import signOut from './sign-out'
import setError from './set-error'

function* watchUser() {
  yield takeLatest(ActionType.CREATE_USER, signUp)
  yield takeLatest(ActionType.SIGN_IN, signIn)
  yield takeLatest(ActionType.SIGN_OUT, signOut)
  yield takeLeading(ActionType.SET_USER_ERROR, setError)
}

export default watchUser
