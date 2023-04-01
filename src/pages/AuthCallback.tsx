import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToken } from '../redux/appReducer';

const AuthCallback = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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

