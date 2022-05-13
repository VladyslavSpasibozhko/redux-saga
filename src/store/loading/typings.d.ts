import { actions } from './actions';

declare global {
  type LoadingState = Record<string, boolean>;
  type LoadingActions = ValueOf<typeof actions>;
  type LoadingActionsType = ReturnType<LoadingActions>;
}
