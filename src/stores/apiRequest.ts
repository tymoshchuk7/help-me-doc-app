import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useAppStore from './appStore';
import { axiosClient } from '../helpers';
import { APIResult } from '../types';

interface Params<T> {
  path: string,
  method?: string,
  body?: {
    data: Record<string, any>,
  },
  onSuccess?: (data: T) => void,
  onFail?: (error: AxiosError) => void,
  successToastMessage?: string,
  failToastMessage?: string,
}

function getUnauthorizedUrl(): string {
  const loginPath = '/login';
  const { pathname } = window.location;

  return pathname === '/' ? loginPath : `${loginPath}?redirect=${encodeURIComponent(pathname)}`;
}

export const apiRequest = async <R extends Record<string, any>>({
  path, method, body, onSuccess, onFail, successToastMessage, failToastMessage,
}: Params<R>): Promise<APIResult<R>> => {
  const { token, setAuthToken } = useAppStore.getState();
  try {
    const { data } = await axiosClient<R>({
      path,
      authToken: token,
      method,
      body,
    });

    if (successToastMessage) {
      toast(successToastMessage, { type: 'success' });
    }
    onSuccess?.(data);
    return { hasError: false, data };
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 401) {
      setAuthToken(null);
      window.location.href = getUnauthorizedUrl();
    }

    if (failToastMessage) {
      toast(failToastMessage, { type: 'error' });
    }
    onFail?.(error);
    return { hasError: true, error };
  }
};
