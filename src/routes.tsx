import { ReactElement, useState } from 'react';
import {
  createBrowserRouter, Navigate, Outlet,
} from 'react-router-dom';
import { useAuth } from './contexts';
import { useAsyncEffect } from './hooks';
import { useUserStore } from './stores';
import { AppRouteNames } from './constants';
import {
  AuthCallbackPage, ChangePasswordPage, DashboardPage,
  LoginPage, SignUpPage,
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
    path: AppRouteNames.authCallback,
    Component: AuthCallbackPage,
  },
  {
    path: AppRouteNames.login,
    Component: LoginPage,
  },
  {
    path: AppRouteNames.signup,
    Component: SignUpPage,
  },
  {
    path: AppRouteNames.changePassword,
    Component: ChangePasswordPage,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: AppRouteNames.dashboard,
        Component: DashboardPage,
      },
    ],
  },
]);
