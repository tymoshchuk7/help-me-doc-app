import React, { ReactElement } from 'react';
import {
  createBrowserRouter, Navigate, Outlet,
} from 'react-router-dom';
import { useAuth } from './contexts';
import {
  LoginPage, SignUpPage, AuthCallbackPage,
  ChangePasswordPage, DashboardPage,
} from './pages';

const PrivateRoute = (): ReactElement => {
  const { isAuthorized } = useAuth();

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
