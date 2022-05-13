import { executors } from './types';

const initial: ModalState = {
  isOpen: false,
  modal: null,
};

export const reducer = (
  state = initial,
  action: ModalActionsType,
): ModalState => {
  switch (action.type) {
    case executors.MODAL_OPEN:
      return action.payload;
    case executors.MODAL_CLOSE:
      return { isOpen: false, modal: null };
    default:
      return state;
  }
};
