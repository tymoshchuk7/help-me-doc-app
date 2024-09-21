import React, { ReactElement, useState } from 'react';
import {
  createBrowserRouter, Navigate, Outlet,
} from 'react-router-dom';
import { useAuth } from './contexts';
import { useAsyncEffect } from './hooks';
import { useUserStore } from './stores';
import {
  LoginPage, SignUpPage, AuthCallbackPage,
  ChangePasswordPage, DashboardPage,
} from './pages';
import { Loader } from './components';

const PrivateRoute = (): ReactElement => {
  const { isAuthorized } = useAuth();
  const { me, getMe } = useUserStore();
  const [onLoading, setOnLoading] = useState(true);

  useAsyncEffect(async () => {
    if (isAuthorized && !me) {
      await getMe();
    }
    setOnLoading(false);
  }, []);

  if (onLoading) {
    return <Loader />;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: '/authCallback',
    Component: AuthCallbackPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignUpPage,
  },
  {
    path: '/change-password',
    Component: ChangePasswordPage,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        Component: DashboardPage,
      },
    ],
  },
]);
