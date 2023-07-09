import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Params<B> {
  path: string
  method?: AxiosRequestConfig['method'],
  authToken?: string | null,
  body?: B
}

export default function apiRequest<R, B = any>({
  path, method = 'get', authToken, body,
}: Params<B>): Promise<AxiosResponse<R>> {
  return axios.request<R>({
    url: `${process.env.REACT_APP_API_URL}${path}`,
    method,
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    data: body,
  });
}
