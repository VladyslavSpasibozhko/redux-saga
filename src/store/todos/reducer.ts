import { executors } from './types';

const initial: TodoState = {
  todos: [],
  todo: null,
};

export const reducer = (
  state = initial,
  action: TodoActionsType,
): typeof initial => {
  switch (action.type) {
    case executors.GET_TODO:
      return { ...state, todo: action.payload };
    case executors.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case executors.GET_TODOS:
      return { ...state, todos: action.payload };
    case executors.CREATE_TODO:
      return { ...state, todos: [action.payload, ...state.todos] };
    case executors.UPDATE_TODO:
      return {
        todo: action.payload,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    default:
      return state;
  }
};
