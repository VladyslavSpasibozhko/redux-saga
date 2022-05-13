import { all } from 'redux-saga/effects';
import { put, takeLatest } from '@redux-saga/core/effects';
import { actions } from './actions';
import { watchers } from './types';

function* open(action: Action<ModalState>) {
  yield put(actions.open(action.payload));
}

function* close() {
  yield put(actions.close());
}

export function* runSagas() {
  yield all([
    takeLatest(watchers.MODAL_OPEN, open),
    takeLatest(watchers.MODAL_CLOSE, close),
  ]);
}
