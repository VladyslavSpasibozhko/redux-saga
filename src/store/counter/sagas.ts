import { all } from 'redux-saga/effects';
import {
  actionChannel,
  call,
  cancel,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { actions } from './actions';
import { watchers } from './types';
import { store } from '../index';

function* increment() {
  yield put(actions.increment());
}

function* decrement() {
  yield put(actions.decrement());
}

function* incrementAsync() {
  yield delay(1500);
  yield put(actions.increment());
}

function* decrementAsync() {
  yield delay(1500);
  yield put(actions.decrement());
}

function* wsOpen(action: Action<WebSocket>) {
  yield put(actions.wsConnecting(false));
  yield put(actions.wsOpen(action.payload));
}

function* wsClose() {
  yield put(actions.wsClose());
}

function* wsError(action: Action<Event>) {
  // yield put({ type: 'WS_CONNECT', payload: false });
}

function* wsMessage(action: Action<MessageEvent>) {
  try {
    const value = JSON.parse(action.payload.data);
    yield put(actions.wsMessage(Number(value)));
  } catch (err) {
    console.log(err);
  }
}

function* wsSend(
  action: Action<string>,
): Generator<unknown, void, CounterState> {
  const state = yield select((store: Store) => store.Counter);

  if (state.isConnected && state.ws) {
    state.ws.send(JSON.stringify(action.payload));
  }
}

function* wsCloseRequest(): Generator<unknown, void, CounterState> {
  const state = yield select((store: Store) => store.Counter);

  if (state.isConnected && state.ws) {
    state.ws.close();
  }
}

function* connect() {
  yield put(actions.wsConnecting(true));

  const ws = new WebSocket(
    'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  );

  ws.onopen = () => {
    store.dispatch(actions.wsOpenWatcher(ws));
  };

  ws.onerror = (ev: Event) => {
    store.dispatch(actions.wsErrorWatcher(ev));
  };

  ws.onmessage = (msg: MessageEvent) => {
    store.dispatch(actions.wsMessageWatcher(msg));
  };

  ws.onclose = () => {
    store.dispatch(actions.wsCloseWatcher());
  };
}

function* customTakeEvery(): Generator<unknown, void, any> {
  while (true) {
    yield take(watchers.INCREMENT_ASYNC);
    yield fork(incrementAsync);
  }
}

function* customTakeLatest(): Generator<unknown, void, any> {
  while (true) {
    yield take(watchers.INCREMENT_ASYNC);
    yield call(incrementAsync);
  }
}

function* sequence(): Generator<unknown, void, any> {
  const channel = yield actionChannel(watchers.INCREMENT_ASYNC);

  while (true) {
    const action = yield take(channel);
    console.log(action);
    yield call(incrementAsync);
  }
}

function* cancellableTask<T = unknown, R = void, N = unknown>(
  saga: () => Generator<T, R, N>,
): Generator<unknown, void, any> {
  const task = yield fork(saga);

  yield take(watchers.CANCEL_ASYNC);
  yield cancel(task);
}

export function* runSagas() {
  yield all([
    takeLatest(watchers.INCREMENT, increment),
    takeLatest(watchers.DECREMENT, decrement),
    //

    // takeLatest(watchers.INCREMENT_ASYNC, incrementAsync),
    // takeEvery(watchers.INCREMENT_ASYNC, incrementAsync),
    // customTakeEvery(),
    // customTakeLatest(),
    // sequence(),
    // takeLatest(watchers.DECREMENT_ASYNC, function* () {
    //   yield cancellableTask(decrementAsync);
    // }),
    // takeLatest(watchers.INCREMENT_ASYNC, function* () {
    //   yield cancellableTask(incrementAsync);
    // }),

    //
    takeLatest(watchers.WS_OPEN_WATCHER, wsOpen),
    takeLatest(watchers.WS_CLOSE_WATCHER, wsClose),
    takeLatest(watchers.WS_MESSAGE_WATCHER, wsMessage),
    takeLatest(watchers.WS_ERROR_WATCHER, wsError),

    //
    takeLatest(watchers.WS_CONNECT_REQUEST, connect),
    takeLatest(watchers.WS_SEND_REQUEST, wsSend),
    takeLatest(watchers.WS_CLOSE_REQUEST, wsCloseRequest),
  ]);
}
