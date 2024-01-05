import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components';
import {
  AuthCallbackPage, LoginPage, MainPage, SignUpPage,
  InvitationCallbackPage, ChatsPage,
} from './pages';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        Component: MainPage,
      },
      {
        path: '/chats',
        Component: ChatsPage,
      },
    ],
  },
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
    path: '/invitation/:id',
    Component: InvitationCallbackPage,
  },
]);