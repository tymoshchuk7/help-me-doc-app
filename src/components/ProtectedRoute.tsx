import React, {
  ReactElement, ReactNode, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Main = ({ children }: { children: ReactNode }): ReactElement | any => {
  const appState = useSelector(({ app }: RootState) => app);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appState.token) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default Main;