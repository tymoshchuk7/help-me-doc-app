import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Params<B> {
  path: string
  method?: AxiosRequestConfig['method'],
  authToken?: string | null,
  body?: B
}

export default function axiosClient<R, B = any>({
  path, method = 'get', authToken, body,
}: Params<B>): Promise<AxiosResponse<R>> {
  const baseUrl = import.meta.env.VITE_API_URL;
  const headers: AxiosRequestConfig['headers'] = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return axios.request<R>({
    url: `${baseUrl}${path}`,
    method,
    headers,
    data: body,
  });
}
