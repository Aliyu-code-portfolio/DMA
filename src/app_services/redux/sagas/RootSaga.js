import { all } from 'redux-saga/effects'
import headlineWatcher from './HeadlineSaga'

function* rootSaga() {
  yield all([
    headlineWatcher(),
  ])
}

export default rootSaga
