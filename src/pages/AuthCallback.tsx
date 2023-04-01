import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';

const AuthCallback = (): ReactElement => {
  const { updateToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.hash.slice(14);
    if (token) {
      updateToken(token);
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

