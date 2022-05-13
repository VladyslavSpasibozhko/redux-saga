import { executors, watchers } from './types';

export const actions = {
  setError: (data: { key: string; value: boolean }) => ({
    type: executors.SET_ERROR,
    payload: data,
  }),
  setErrorWatchers: (data: { key: string; value: boolean }) => ({
    type: watchers.SET_ERROR,
    payload: data,
  }),
};
