import {put, call} from 'redux-saga/effects'
import action from '../actions'
import {userService} from '../../../services'

function* signIn({payload}: ReturnType<typeof action.signIn>) {
  try {
    const {username, password} = payload
    const user = yield call(userService.singIn, username, password)

    yield put(action.setUser(user))
  } catch (err) {
    yield put(action.setUserError(err))
  }
}

export default signIn
