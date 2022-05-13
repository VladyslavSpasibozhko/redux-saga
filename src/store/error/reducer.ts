import { executors } from './types';

const initial: ErrorState = {};

export const reducer = (
  state = initial,
  action: ErrorActionsType,
): typeof initial => {
  switch (action.type) {
    case executors.SET_ERROR:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};
