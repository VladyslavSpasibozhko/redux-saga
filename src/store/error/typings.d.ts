import { actions } from './actions';

declare global {
  type ErrorState = Record<string, boolean>;
  type ErrorActions = ValueOf<typeof actions>;
  type ErrorActionsType = ReturnType<ErrorActions>;
}
