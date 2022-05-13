import { executors, watchers } from './types';

export const actions = {
  getTodo: (data: Todo) => ({ type: executors.GET_TODO, payload: data }),
  getTodos: (data: Todo[]) => ({ type: executors.GET_TODOS, payload: data }),
  updateTodo: (data: Todo) => ({ type: executors.UPDATE_TODO, payload: data }),
  createTodo: (data: Todo) => ({ type: executors.CREATE_TODO, payload: data }),
  deleteTodo: (id: number) => ({ type: executors.DELETE_TODO, payload: id }),

  deleteTodoRequest: (id: number) => ({
    type: watchers.DELETE_TODO,
    payload: id,
  }),
  getTodoRequest: (id: number) => ({ type: watchers.GET_TODO, payload: id }),
  getTodosRequest: () => ({ type: watchers.GET_TODOS }),
  updateTodoRequest: (todo: Todo) => ({
    type: watchers.UPDATE_TODO,
    payload: todo,
  }),
  createTodoRequest: (todo: Omit<Todo, 'id'>) => ({
    type: watchers.CREATE_TODO,
    payload: todo,
  }),
};
