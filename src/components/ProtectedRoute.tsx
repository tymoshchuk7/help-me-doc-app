import React, {
  ReactElement, ReactNode, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div>
      {children}
    </div>
  );
};

export default Main;