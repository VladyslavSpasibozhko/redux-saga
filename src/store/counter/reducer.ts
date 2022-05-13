import { executors } from './types';

const initial: CounterState = {
  ws: null,
  counter: 0,
  isConnecting: false,
  isConnected: false,
};

export const reducer = (
  state = initial,
  action: CounterActionsType,
): CounterState => {
  switch (action.type) {
    case executors.DECREMENT:
      return { ...state, counter: --state.counter };
    case executors.INCREMENT:
      return { ...state, counter: ++state.counter };
    case executors.WS_CONNECTING:
      return { ...state, isConnecting: action.payload };
    case executors.WS_OPEN:
      return { ...state, ws: action.payload, isConnected: true };
    case executors.WS_CLOSE:
      return { ...state, ws: null, isConnected: false };
    case executors.WS_MESSAGE:
      return { ...state, counter: action.payload };
    default:
      return state;
  }
};
