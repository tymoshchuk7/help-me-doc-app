import { useEffect } from 'react';

export default function usePromiseEff(callback: () => void | Promise<void>, memos: any[]): void {
  useEffect(() => {
    Promise.resolve(callback()).catch((e) => { throw e; });
  }, memos); // eslint-disable-line react-hooks/exhaustive-deps
}
