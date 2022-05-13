import { put, takeLatest, call, takeEvery } from '@redux-saga/core/effects';
import { actions, watchers } from '.';
import {
  fetchTodo,
  fetchTodos,
  updateTodoRequest,
  createTodoRequest,
  deleteTodoRequest,
} from './api';

export function* getTodo(
  action: Action<number>,
): Generator<unknown, ResponseT<Todo>, ResponseT<Todo>> {
  const response = yield call(fetchTodo, action.payload);

  if (response.success) {
    yield put(actions.getTodo(response.data));
  }

  return response;
}

export function* getTodos(): Generator<
  unknown,
  ResponseT<Todo[]>,
  ResponseT<Todo[]>
> {
  const response = yield call(fetchTodos);

  if (response.success) {
    yield put(actions.getTodos(response.data));
  }

  return response;
}

export function* updateTodo(
  action: Action<Todo>,
): Generator<unknown, ResponseT<Todo>, ResponseT<Todo>> {
  const response = yield call(
    updateTodoRequest,
    action.payload.id,
    action.payload,
  );

  if (response.success) {
    yield put(actions.updateTodo(response.data));
  }

  return response;
}

export function* createTodo(
  action: Action<Omit<Todo, 'id'>>,
): Generator<unknown, ResponseT<Todo>, ResponseT<Todo>> {
  const response = yield call(createTodoRequest, action.payload);

  if (response.success) {
    yield put(actions.createTodo(response.data));
  }

  return response;
}

export function* deleteTodo(
  action: Action<number>,
): Generator<unknown, ResponseT<Todo>, ResponseT<Todo>> {
  const response = yield call(deleteTodoRequest, action.payload);

  if (response.success) {
    yield put(actions.deleteTodo(action.payload));
  }

  return response;
}

export function* runSagas() {
  yield takeLatest(watchers.GET_TODO, getTodo);
  yield takeLatest(watchers.GET_TODOS, getTodos);
  yield takeEvery(watchers.UPDATE_TODO, updateTodo);
  yield takeLatest(watchers.CREATE_TODO, createTodo);
  yield takeEvery(watchers.DELETE_TODO, deleteTodo);
}
