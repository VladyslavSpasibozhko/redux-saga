import { executors } from './types';

const initial: LoadingState = {};

export const reducer = (
  state = initial,
  action: LoadingActionsType,
): typeof initial => {
  switch (action.type) {
    case executors.SET_LOADING:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};
