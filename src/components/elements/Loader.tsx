import { ReactElement } from 'react';
import Spinner from './Spinner';

const Loader = (): ReactElement => (
  <div className="min-height-100vh flex justify-center align-center">
    <Spinner />
  </div>
);

export default Loader;
