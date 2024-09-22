import React, { ReactElement, useEffect } from 'react';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Alert } from 'antd';
import { useAuth } from '../contexts';
import { AppRouteNames } from '../constants';

interface AuthCallbackData {
  id_token: string,
  access_token: string,
  error: string,
  errorDescription: string,
}

const AuthCallback = (): ReactElement => {
  const {
    id_token: idToken, error: authError,
  } = qs.parse(window.location.hash.slice(1)) as unknown as AuthCallbackData;
  const navigate = useNavigate();
  const { updateToken } = useAuth();

  useEffect(() => {
    updateToken(idToken);
    navigate(AppRouteNames.dashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authError) {
    return (
      <Space>
        <Alert
          message="Error"
          description={authError}
          type="error"
        />
        <Link to="/login">Back to login page</Link>
      </Space>
    );
  }

  return <></>;
};

export default AuthCallback;
