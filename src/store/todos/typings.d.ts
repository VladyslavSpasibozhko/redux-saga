import { actions } from './actions';

declare global {
  type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };

  type TodoActions = ValueOf<typeof actions>;
  type TodoActionsType = ReturnType<TodoActions>;
  type TodoState = {
    todos: Todo[];
    todo: Todo | null;
  };
}
