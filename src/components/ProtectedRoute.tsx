import React, {
  ReactElement, ReactNode, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncEffect } from '../hooks';
import { getUser } from '../redux/userReducer';
import { AppDispatch, RootState } from '../store';
import { Loader } from '../components';

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const appState = useSelector(({ app }: RootState) => app);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useAsyncEffect(async () => {
    if (!appState.token) {
      return navigate('/login');
    }
    setIsLoading(true);
    await dispatch(getUser());
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <div className="min-page-height display-flex align-center justify-center">
      <Loader />
    </div>
  ) : <>{children}</>;
};

export default Main;