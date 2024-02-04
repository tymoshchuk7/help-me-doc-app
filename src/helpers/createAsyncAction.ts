import { Dispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import apiRequest from './apiRequest';
import { updateToken } from '../redux/appReducer';

export function getUnauthorizedUrl(): string {
  const loginPath = '/login';
  const { pathname } = window.location;

  return pathname === '/' ? loginPath : `${loginPath}?redirect=${encodeURIComponent(pathname)}`;
}

interface Thunk {
  dispatch: Dispatch,
  getState: () => unknown,
  rejectWithValue: (arg: unknown) => void
}

interface Params<Response, Body> {
  path: string,
  thunk: Thunk,
  method?: string,
  body?: Body,
  onSuccess?: (data: Response) => void,
  onFail?: (error: AxiosError) => void,
  valueOnReject?: unknown,
}
//TODO research thunk typings
export default async function createAsyncAction<Response, Body = {}>({
  path, method, onSuccess, onFail, valueOnReject = {}, thunk, body,
}: Params<Response, Body>): Promise<Response> {
  const { app: { token } } = thunk.getState() as RootState;
  try {
    const { data } = await apiRequest<Response, Body>({
      path,
      authToken: token,
      method,
      body,
    });
    onSuccess?.(data);
    return data;
  } catch (e) {
    const error = e as AxiosError;
    onFail?.(error);
    if (error.response?.status === 401) {
      thunk.dispatch(updateToken(null));
      window.location.href = getUnauthorizedUrl();
    }
    //@ts-ignore
    return thunk.rejectWithValue(valueOnReject);
  }
}