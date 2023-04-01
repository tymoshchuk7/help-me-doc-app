import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { LoginPage, MainPage, SignUpPage, AuthCallback } from './pages';
import { AuthControllerProvider } from './contexts';

const router = createBrowserRouter([
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <AuthControllerProvider>
    <RouterProvider router={router} />
  </AuthControllerProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
