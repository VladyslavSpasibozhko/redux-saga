import { cancel, fork, take, takeEvery } from '@redux-saga/core/effects';
import { Task } from '@redux-saga/types';
import { watchers } from './types';

function* unsubscribe([task, type]: [Task, string]): Generator<
  unknown,
  void,
  any
> {
  while (true) {
    yield take(type);
    yield cancel(task);
  }
}

function* subscribe(action: SubscriberAction): Generator<unknown, void, Task> {
  function executor({ type, payload }: Action<any>) {
    action.payload.cb({
      type,
      payload,
      unsubscribeAction: () => ({ type: action.payload.unsubscribe }),
    });
  }

  const task = yield takeEvery(action.payload.subscribe, executor);
  yield fork(unsubscribe, [task, action.payload.unsubscribe]);
}

export function* runSagas() {
  yield takeEvery(watchers.SUBSCRIBE, subscribe);
}
