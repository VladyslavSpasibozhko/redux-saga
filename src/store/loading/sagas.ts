import { put, takeEvery } from '@redux-saga/core/effects';
import { actions } from './actions';
import { watchers } from './types';

export function* setLoading(action: Action<{ key: string; value: boolean }>) {
  yield put(actions.setLoading(action.payload));
}

export function* runSagas() {
  yield takeEvery(watchers.SET_LOADING, setLoading);
}
