import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthControllerProvider } from '../contexts';

import './index.css';
import './reset.css';

function App() {
  return (
    <AuthControllerProvider>
      <RouterProvider router={router} />
    </AuthControllerProvider>
  );
}

export default App;
