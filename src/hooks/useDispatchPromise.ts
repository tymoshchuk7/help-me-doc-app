import { useMemo } from 'react';
import { APIResult } from '../types';

interface Options {
  dispatchIf: boolean;
}

export default function useDispatchPromise<T = unknown>(
  action: () => Promise<APIResult<T> | null>,
  { dispatchIf = true }: Options = { dispatchIf: true },
): Promise<T | null> {
  return useMemo<Promise<T | null>>(
    () => {
      if (dispatchIf) {
        return action?.() as Promise<T>;
      }

      return Promise.resolve(null);
    },
    [dispatchIf, action],
  );
}
