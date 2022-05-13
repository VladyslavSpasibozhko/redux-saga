import React, { useEffect, useMemo } from 'react';
import { Form, ListGroup, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/todos';
import { actions as modalActions } from '../../store/modal';
import { MdDelete } from 'react-icons/md';
import { FullLoader } from '../FullLoader';

export function Todos() {
  const dispatch = useDispatch();

  const loading = useSelector((state: Store) => state.Loading);
  const todos = useSelector((state: Store) => state.Todo.todos);

  const completed = useMemo(() => todos.filter((t) => t.completed), [todos]);

  const openModal = () => {
    dispatch(
      modalActions.openWatcher({ isOpen: true, modal: 'CreateTodoModal' }),
    );
  };

  useEffect(() => {
    dispatch(actions.getTodosRequest());
  }, [dispatch]);

  if (loading.GET_TODOS) {
    return (
      <div className="flex items-center justify-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button variant="outline-primary" onClick={openModal}>
          Create
        </Button>

        <div className="flex items-center">
          <span className="font-600">Completed:</span>
          <span className="font-600 text-coolGray-500 ml-2">
            {completed.length} / {todos.length}
          </span>
        </div>
      </div>

      <FullLoader loading={loading.UPDATE_TODO || loading.DELETE_TODO}>
        <ListGroup className="mt-3">
          {todos.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              variant={todo.completed ? 'primary' : 'light'}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Form.Check
                    checked={todo.completed}
                    className="mr-5"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        actions.updateTodoRequest({
                          ...todo,
                          completed: event.target.checked,
                        }),
                      );
                    }}
                  />
                  <span>{todo.title}</span>
                </div>

                <MdDelete
                  className="text-red-600 cursor-pointer"
                  size="20"
                  onClick={() => {
                    dispatch(actions.deleteTodoRequest(todo.id));
                  }}
                />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </FullLoader>
    </div>
  );
}
