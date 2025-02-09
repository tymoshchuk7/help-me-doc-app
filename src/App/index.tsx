import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './routes';
import { AuthControllerProvider, ThemeProvider } from '../contexts';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './reset.css';

function App() {
  return (
    <>
      <AuthControllerProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthControllerProvider>
      <ToastContainer />
    </>
  );
}

export default App;
