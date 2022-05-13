type Store = {
  Counter: CounterState;
  Error: ErrorState;
  Loading: LoadingState;
  Todo: TodoState;
  Modal: ModalState;
};

type Action<T> = {
  type: string;
  payload: T;
};
