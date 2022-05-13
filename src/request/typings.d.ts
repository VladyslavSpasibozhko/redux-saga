type SuccessResponse<T> = {
  success: true;
  data: T;
  error: null;
};

type ErrorResponse = {
  success: false;
  data: null;
  error: {
    title: string;
    message: string;
  };
};

type ResponseT<T> = SuccessResponse<T> | ErrorResponse;

type RequestConfig = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  body?: any;
  //FIXME
  key: string;
  params?: Record<string, any>;
  wait?: number;
};
