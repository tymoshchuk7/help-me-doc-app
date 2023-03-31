import React, {
  ReactElement, ReactNode, useEffect,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {children}
    </div>
  );
};

export default Main;