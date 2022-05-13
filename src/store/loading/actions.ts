import { executors, watchers } from './types';

export const actions = {
  setLoading: (data: { key: string; value: boolean }) => ({
    type: executors.SET_LOADING,
    payload: data,
  }),
  setLoadingWatcher: (data: { key: string; value: boolean }) => ({
    type: watchers.SET_LOADING,
    payload: data,
  }),
};
