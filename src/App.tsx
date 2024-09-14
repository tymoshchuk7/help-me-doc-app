import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthControllerProvider } from './contexts';

function App() {
  return (
    <AuthControllerProvider>
      <RouterProvider router={router} />
    </AuthControllerProvider>
  );
}

export default App;
