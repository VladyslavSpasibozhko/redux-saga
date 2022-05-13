import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { todosActions } from '../../../store/emitter';
import { actions } from '../../../store/todos';
import { actions as modalActions } from '../../../store/modal';
import { FullLoader } from '../../FullLoader';

export const CreateTodoModal: React.FC = () => {
  const [text, setText] = useState<string>('');

  const dispatch = useDispatch();
  const loading = useSelector((store: Store) => store.Loading);

  const closeModal = () => {
    dispatch(modalActions.closeWatcher());
  };

  const onCreate = () => {
    dispatch(
      todosActions.createTodoSubscription((data) => {
        if (data.payload) {
          closeModal();
          dispatch(data.unsubscribeAction());
        }
      }),
    );

    dispatch(
      actions.createTodoRequest({
        completed: false,
        title: text,
        userId: 1,
      }),
    );
  };

  return (
    <FullLoader loading={loading.CREATE_TODO}>
      <Modal.Header>
        <Modal.Title>Create Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>What do you have to do ?</Form.Label>
            <Form.Control
              as="textarea"
              value={text}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setText(event.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" disabled={!Boolean(text)} onClick={onCreate}>
          Create
        </Button>
      </Modal.Footer>
    </FullLoader>
  );
};
