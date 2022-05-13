import { executors, watchers } from './types';

export const actions = {
  open: (data: ModalState) => ({ type: executors.MODAL_OPEN, payload: data }),
  close: () => ({ type: executors.MODAL_CLOSE }),
  closeWatcher: () => ({ type: watchers.MODAL_CLOSE }),
  openWatcher: (data: ModalState) => ({
    type: watchers.MODAL_OPEN,
    payload: data,
  }),
} as const;
