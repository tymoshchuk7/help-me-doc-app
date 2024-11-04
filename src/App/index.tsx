import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './routes';
import { AuthControllerProvider } from '../contexts';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './reset.css';

function App() {
  return (
    <>
      <AuthControllerProvider>
        <RouterProvider router={router} />
      </AuthControllerProvider>
      <ToastContainer />
    </>
  );
}

export default App;
