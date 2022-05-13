import * as Modals from '../../components/Modals';

declare global {
  type Modals = keyof typeof Modals;

  type ModalContextType = {
    isOpen: boolean;
    modal: Modals | null;
    setConfig: ({ modal, value }: Omit<ModalContextType, 'setConfig'>) => void;
  };
}
