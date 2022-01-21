import {put, call} from 'redux-saga/effects'
import action from '../actions'
import {userService} from '../../../services'

function* signOut() {
  try {
    yield call(userService.signOut)
    yield put(action.setUser(null))
  } catch (err) {
    console.log(err.toString())
  }
}

export default signOut
