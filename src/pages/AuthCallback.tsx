import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateToken } from '../redux/appReducer';
import { useAsyncEffect } from '../hooks';
import { RootState } from '../store';

const AuthCallback = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const preservedWorkspaceCreate = useSelector(({ app }: RootState) => app.preserveWorkspaceToBeCreated);

  useAsyncEffect(() => {
    if (preservedWorkspaceCreate) {
      //TODO add action to create workspace
    }
    const url = new URL(window.location.href);
    const token = url.hash.slice(14);
    if (token) {
      dispatch(updateToken(token));
      return navigate('/');
    }
    return navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    </>
  );
};

export default AuthCallback;

