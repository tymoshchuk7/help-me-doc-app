import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, SignUpPage, AuthCallbackPage } from './pages';

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
    path: '/',
    element: <div>App</div>,
  },
]);
