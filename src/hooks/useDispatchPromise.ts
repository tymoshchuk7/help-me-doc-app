import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface Options {
  dispatchIf: boolean;
}

export default function useDispatchPromise<T = unknown>(
  action: AsyncThunkAction<unknown, unknown, {}>,
  { dispatchIf = true }: Options = { dispatchIf: true },
): Promise<T | null> {
  const dispatch = useDispatch<AppDispatch>();

  const dispatcher = useMemo<Promise<T | null>>(() => {
    if (dispatchIf) {
      return dispatch(action) as unknown as Promise<T>;
    }

    return Promise.resolve(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, dispatchIf]);

  return dispatcher;
}
