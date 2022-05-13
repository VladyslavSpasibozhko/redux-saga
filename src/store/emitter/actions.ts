import { watchers } from './types';
import { executors as todosExecutors } from '../todos/types';

export const actions = {
  subscribe: (data: SubscriberAction['payload']) => ({
    type: watchers.SUBSCRIBE,
    payload: data,
  }),
};

export const todos = {
  updateTodoSubscription: (cb: SubscriberAction['payload']['cb']) =>
    actions.subscribe({
      subscribe: todosExecutors.UPDATE_TODO,
      unsubscribe: todosExecutors.UPDATE_TODO + '_UNSUBSCRIBE',
      cb,
    }),

  createTodoSubscription: (cb: SubscriberAction['payload']['cb']) =>
    actions.subscribe({
      subscribe: todosExecutors.CREATE_TODO,
      unsubscribe: todosExecutors.CREATE_TODO + '_UNSUBSCRIBE',
      cb,
    }),
};
