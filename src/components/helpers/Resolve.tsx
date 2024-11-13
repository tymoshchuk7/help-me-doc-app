import {
  useState, ReactElement, useEffect,
  ReactNode,
} from 'react';

interface Props {
  promises: Promise<unknown>[],
  children: (...args: any[]) => ReactElement,
  onLoad?: () => void,
  loader?: ReactNode,
}

/* Accepts promises returned via useDispatchPromise custom hook */

const Resolve = ({ promises, children, onLoad, loader }: Props): ReactElement | null => {
  const [loaded, onSetLoaded] = useState(false);
  const [error, onSetError] = useState<Error | string | null>(null);
  const [values, onSetValues] = useState<unknown[]>([]);

  useEffect(() => {
    Promise.all(promises).then((vals: unknown[]) => {
      onSetValues(vals);
      onSetLoaded(true);
      onLoad?.();
    }).catch((e) => {
      onLoad?.();
      onSetError(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, promises);

  if (error) {
    return <div>{String(error)}</div>;
  }

  if (!loaded) {
    return loader || <div>loading...</div>;
  }

  return children(...values);
};

export default Resolve;
