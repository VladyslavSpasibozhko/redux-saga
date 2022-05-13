import React, { useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/modal';
import * as Modals from '../../components/Modals';

export const ModalProvider: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, modal } = useSelector((store: Store) => store.Modal);

  const onClose = () => {
    dispatch(actions.closeWatcher());
  };

  const Component = useMemo(() => {
    if (modal) {
      const ModalComponent = Modals[modal];

      return ModalComponent;
    }

    return null;
  }, [modal]);

  return (
    <Modal show={isOpen} centered onHide={onClose}>
      {Component && <Component />}
    </Modal>
  );
};
