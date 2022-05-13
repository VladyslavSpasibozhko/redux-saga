import axios, { AxiosResponse } from 'axios';
import { store } from '../store';
import { actions as errors } from '../store/error';
import { actions as loading } from '../store/loading';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  function <T>(response: AxiosResponse<T>): SuccessResponse<T> {
    return {
      success: true,
      data: response.data,
      error: null,
    };
  },
  function (err) {
    return Promise.reject({
      success: false,
      data: null,
      error: {
        message: err.message,
        title: err.title,
      },
    });
  },
);

export async function request<T>({
  method,
  body,
  key,
  path,
  params,
  wait,
}: RequestConfig): Promise<ResponseT<T>> {
  store.dispatch(loading.setLoadingWatcher({ key, value: true }));
  store.dispatch(errors.setErrorWatchers({ key, value: false }));

  if (wait) {
    await new Promise((res) => {
      setTimeout(() => res('ok'), wait);
    });
  }

  try {
    const response = (await instance({
      method,
      url: path,
      data: body,
      params,
    })) as never as SuccessResponse<T>;

    return response;
  } catch (err: any) {
    console.log(err);
    store.dispatch(errors.setErrorWatchers({ key, value: true }));
    return err as ErrorResponse;
  } finally {
    store.dispatch(loading.setLoadingWatcher({ key, value: false }));
  }
}
