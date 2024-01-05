import React, {
  useState, ReactElement, useEffect,
} from 'react';
import Loader from './Loader';

interface Props {
  promises: Promise<unknown>[],
  children: (...args: any[]) => ReactElement,
}

const Resolve = ({ promises, children }: Props): ReactElement | null => {
  const [loaded, onSetLoaded] = useState(false);
  const [error, onSetError] = useState<Error | string | null | unknown>(null);
  const [values, onSetValues] = useState<unknown[]>([]);

  useEffect(() => {
    Promise.all(promises).then((vals: unknown[]) => {
      onSetValues(vals);
      onSetLoaded(true);
    }).catch((e) => {
      onSetError(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, promises);

  if (error) {
    return <div>{String(error)}</div>;
  }

  if (!loaded) {
    return (
      <div className="min-page-height display-flex align-center justify-center">
        <Loader />
      </div>
    );
  }

  return children(...values);
};

export default Resolve;
