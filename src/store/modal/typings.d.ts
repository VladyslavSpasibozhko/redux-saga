import { actions } from './actions';
import * as Modals from '../../components/Modals';

declare global {
  type Modals = keyof typeof Modals;

  type ModalState = {
    isOpen: boolean;
    modal: Modals | null;
  };

  type ModalActions = ValueOf<typeof actions>;
  type ModalActionsType = ReturnType<ModalActions>;
}
