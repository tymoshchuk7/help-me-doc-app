import { ReactElement, useState } from 'react';
import {
  createBrowserRouter, Navigate, Outlet, useNavigate,
} from 'react-router-dom';
import { useAuth } from './contexts';
import { useAsyncEffect } from './hooks';
import { useUserStore, useInvitationsStore } from './stores';
import { AppRouteNames } from './constants';
import {
  AuthCallbackPage, ChangePasswordPage, DashboardPage,
  LoginPage, SignUpPage, CreateTenantPage, InvitationCallbackPage,
  Page404,
} from './pages';
import { Loader } from './components';

const PrivateRoute = (): ReactElement => {
  const { isAuthorized, onLogOut } = useAuth();
  const navigate = useNavigate();
  const { me, getMe } = useUserStore();
  const { preservedInvitation, acceptInvitation } = useInvitationsStore();
  const [onLoading, setOnLoading] = useState(true);

  useAsyncEffect(async () => {
    if (isAuthorized) {
      if (preservedInvitation) {
        await acceptInvitation(preservedInvitation.id);
      }
      if (!me) {
        const { data } = await getMe();
        if (data?.user) {
          if (!data.user.default_tenant) {
            navigate(AppRouteNames.createTenant);
          }
        } else {
          onLogOut();
        }
      }
    }
    return setOnLoading(false);
  }, [onLogOut, navigate]);

  if (onLoading) {
    return <Loader />;
  }

  return isAuthorized ? <Outlet /> : <Navigate to={AppRouteNames.login} />;
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
    path: AppRouteNames.invitationCallback,
    Component: InvitationCallbackPage,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: AppRouteNames.dashboard,
        Component: DashboardPage,
      },
      {
        path: AppRouteNames.createTenant,
        Component: CreateTenantPage,
      },
    ],
  },
  {
    path: '*',
    Component: Page404,
  },
]);
