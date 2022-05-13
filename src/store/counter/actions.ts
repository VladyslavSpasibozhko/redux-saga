import { executors, watchers } from './types';

export const actions = {
  increment: () => ({ type: executors.INCREMENT }),
  decrement: () => ({ type: executors.DECREMENT }),
  incrementWatcher: () => ({ type: watchers.INCREMENT }),
  decrementWatcher: () => ({ type: watchers.DECREMENT }),
  incrementWatcherAsync: () => ({ type: watchers.INCREMENT_ASYNC }),
  decrementWatcherAsync: () => ({ type: watchers.DECREMENT_ASYNC }),
  cancelIncrement: () => ({ type: watchers.CANCEL_ASYNC }),

  wsConnectRequest: () => ({ type: watchers.WS_CONNECT_REQUEST }),
  wsCloseRequest: () => ({ type: watchers.WS_CLOSE_REQUEST }),
  wsSendRequest: (msg: string) => ({
    type: watchers.WS_SEND_REQUEST,
    payload: msg,
  }),
  wsCloseWatcher: () => ({ type: watchers.WS_CLOSE_WATCHER }),
  wsMessageWatcher: (msg: MessageEvent) => ({
    type: watchers.WS_MESSAGE_WATCHER,
    payload: msg,
  }),
  wsErrorWatcher: (err: Event) => ({
    type: watchers.WS_ERROR_WATCHER,
    payload: err,
  }),
  wsOpenWatcher: (ws: WebSocket) => ({
    type: watchers.WS_OPEN_WATCHER,
    payload: ws,
  }),

  wsOpen: (ws: WebSocket) => ({ type: executors.WS_OPEN, payload: ws }),
  wsConnecting: (data: boolean) => ({
    type: executors.WS_CONNECTING,
    payload: data,
  }),
  wsClose: () => ({ type: executors.WS_CLOSE }),
  wsError: (err: Event) => ({ type: executors.WS_ERROR, payload: err }),
  wsMessage: (data: number) => ({
    type: executors.WS_MESSAGE,
    payload: data,
  }),
} as const;
