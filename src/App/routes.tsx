/* eslint-disable max-len */
import { ReactElement, useState } from 'react';
import {
  createBrowserRouter, Navigate, Outlet, useNavigate,
} from 'react-router-dom';
import { useAuth } from '../contexts';
import { useAsyncEffect, useHasPermissions } from '../hooks';
import { useUserStore, useInvitationsStore } from '../stores';
import { AppRouteNames, Permissions } from '../constants';
import {
  AuthCallbackPage, ChangePasswordPage, DashboardPage,
  LoginPage, SignUpPage, CreateTenantPage, InvitationCallbackPage,
  Page404, ChatsPage, ChatPage,
} from '../pages';
import { Loader, AppPageLayout } from '../components';
import ErrorBoundary from './ErrorBoundary';

const AuthenticatedRoute = (): ReactElement => {
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

const RestrictedPermissionsRoute = (
  { permissions }: { permissions: Permissions[] },
): ReactElement => {
  const hasPermissions = useHasPermissions(permissions);
  return hasPermissions ? <Outlet /> : <Navigate to={AppRouteNames.dashboard} />;
};

export const router = createBrowserRouter([
  {
    Component: ErrorBoundary,
    children: [
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
        element: <AuthenticatedRoute />,
        children: [
          {
            path: AppRouteNames.createTenant,
            Component: CreateTenantPage,
          },
          {
            element: <AppPageLayout />,
            children: [
              {
                path: AppRouteNames.dashboard,
                Component: DashboardPage,
              },
              {
                path: AppRouteNames.chats,
                element: <RestrictedPermissionsRoute permissions={[Permissions.CAN_SEND_MESSAGES]} />,
                children: [
                  {
                    index: true,
                    element: <ChatsPage />,
                  },
                ],
              },
              {
                path: AppRouteNames.chat,
                element: <RestrictedPermissionsRoute permissions={[Permissions.CAN_SEND_MESSAGES]} />,
                children: [
                  {
                    index: true,
                    element: <ChatPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        Component: Page404,
      },
    ],
  },
]);
