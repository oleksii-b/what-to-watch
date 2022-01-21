import {createStore, applyMiddleware} from '@reduxjs/toolkit'
import {composeWithDevTools} from '@redux-devtools/extension'
import createSagaMiddleware from 'redux-saga'
import {watchMovies} from './movies'
import {watchUser} from './user'
import rootReducer from './root-reducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(watchMovies)
sagaMiddleware.run(watchUser)

export default store
