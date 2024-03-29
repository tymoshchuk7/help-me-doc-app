import React, { ReactElement, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncEffect } from '../hooks';
import { getMe } from '../redux/userReducer';
import { AppDispatch, RootState } from '../store';
import { Loader } from '../components';

const Main = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const appState = useSelector(({ app }: RootState) => app);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useAsyncEffect(async () => {
    if (!appState.token) {
      return navigate('/login');
    }
    setIsLoading(true);
    await dispatch(getMe());
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <div className="min-page-height display-flex align-center justify-center">
      <Loader />
    </div>
  ) : <Outlet />;
};

export default Main;