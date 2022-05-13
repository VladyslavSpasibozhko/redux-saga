import { put, select, takeEvery } from '@redux-saga/core/effects';
import { actions } from './actions';
import { watchers } from './types';

export function* setError(
  action: Action<{ key: string; value: boolean }>,
): Generator<unknown, void, ErrorState> {
  const errors = yield select((store: Store) => store.Error);

  if (action.payload.value) {
    yield put(actions.setError(action.payload));
  }

  if (!action.payload.value) {
    if (errors[action.payload.key]) {
      yield put(actions.setError(action.payload));
    }
  }
}

export function* runSagas() {
  yield takeEvery(watchers.SET_ERROR, setError);
}
