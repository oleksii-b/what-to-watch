import {put, call} from 'redux-saga/effects'
import action from '../actions'
import {userService} from '../../../services'

function* signUp({payload}: ReturnType<typeof action.createUser>) {
  try {
    const {username, password, email} = payload
    const user = yield call(userService.singUp, username, password, email)

    yield put(action.setUser(user))
  } catch (err) {
    yield put(action.setUserError(err))
  }
}

export default signUp
