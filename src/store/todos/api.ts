import { executors } from '.';
import { request } from '../../request';

export async function fetchTodo(id: number) {
  return await request<Todo>({
    key: executors.GET_TODO,
    path: `/todos/${id}`,
    wait: 500,
  });
}

export async function deleteTodoRequest(id: number) {
  return await request({
    method: 'DELETE',
    key: executors.DELETE_TODO,
    path: `/todos/${id}`,
    wait: 500,
  });
}

export async function fetchTodos() {
  return await request<Todo[]>({
    key: executors.GET_TODOS,
    path: '/todos',
    params: {
      _limit: 10,
    },
  });
}

export async function updateTodoRequest(id: number, data: Partial<Todo>) {
  return await request<Todo>({
    key: executors.UPDATE_TODO,
    path: `/todos/${id}`,
    method: 'PUT',
    body: data,
  });
}

export async function createTodoRequest(data: Partial<Todo>) {
  return await request<Todo>({
    key: executors.CREATE_TODO,
    path: '/todos',
    method: 'POST',
    body: data,
  });
}
