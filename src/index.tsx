import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './routes';
import reportWebVitals from './reportWebVitals';
import { AuthControllerProvider } from './contexts';
import { store } from './store';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <AuthControllerProvider>
      <RouterProvider router={router} />
    </AuthControllerProvider>
  </Provider>,
);

reportWebVitals();
