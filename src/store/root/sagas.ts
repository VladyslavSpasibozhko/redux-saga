import { fork } from '@redux-saga/core/effects';
import { runSagas } from '../todos';
import { runSagas as runLoadingSagas } from '../loading';
import { runSagas as runErrorSagas } from '../error';
import { runSagas as runCounterSagas } from '../counter';
import { runSagas as runEmitterSagas } from '../emitter';
import { runSagas as runModalSagas } from '../modal';

export function* rootSaga() {
  yield fork(runCounterSagas);
  yield fork(runSagas);
  yield fork(runLoadingSagas);
  yield fork(runErrorSagas);
  yield fork(runEmitterSagas);
  yield fork(runModalSagas);
}
