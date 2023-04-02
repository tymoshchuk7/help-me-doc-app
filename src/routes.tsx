import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components';
import {
  AuthCallback, LoginPage, MainPage, SignUpPage,
} from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><MainPage /></ProtectedRoute>,
  },
  {
    path: '/authCallback',
    element: <AuthCallback />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
]);