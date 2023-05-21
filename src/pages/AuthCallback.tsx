import React, { ReactElement, useState } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { updateToken, preserveTenantCreate } from '../redux/appReducer';
import { createTenant } from '../redux/tenantReducer';
import { useAsyncEffect } from '../hooks';
import { RootState, AppDispatch } from '../store';
import { Loader } from '../components';

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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const preserveTenantToBeCreated = useSelector(({ app }: RootState) => app.preserveTenantToBeCreated);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (authError) {
      setLoading(false);
      return setError(authError);
    }
    if (idToken) {
      dispatch(updateToken(idToken));
      if (preserveTenantToBeCreated) {
        try {
          await dispatch(createTenant());
          dispatch(preserveTenantCreate(null));
        } catch (e) {
          setLoading(false);
          return setError((e as string).toString());
        }
      }
      setLoading(false);
      return navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-page-height display-flex align-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <Space>
        <Alert
          message="Error"
          description={error}
          type="error"
        />
        <Link to="/login">Back to login page</Link>
      </Space>
    );
  }

  return <></>;
};

export default AuthCallback;

