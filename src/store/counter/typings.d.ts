import { actions } from './actions';

declare global {
  type CounterActions = ValueOf<typeof actions>;
  type CounterActionsType = ReturnType<CounterActions>;
  type CounterState = {
    ws: WebSocket | null;
    counter: number;
    isConnecting: boolean;
    isConnected: boolean;
  };
}
