import {
  createContext, useContext, ReactNode,
  useCallback, useState,
} from 'react';
import { WebAuth } from 'auth0-js';
import { IUser } from '../types';

interface IAuthController {
  onSignUp: (dto: IUser) => Promise<unknown>,
  onLogin: (dto: IUser) => Promise<unknown>,
  updateToken: (token: string | null) => void,
  token: string | null,
}

const auth0 = new WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: 'http://localhost:3000/authCallback',
  responseType: 'token',
  scope: 'profile email token',
});

const AuthControllerContext = createContext<IAuthController>({} as IAuthController);

export const useAuth = (): IAuthController => useContext(AuthControllerContext);

export const AuthControllerProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const updateToken = (value: string | null) => {
    if (value) {
      window.localStorage.setItem('token', value);
    } else {
      window.localStorage.removeItem('token');
    }
    setToken(value);
  };

  const onSignUp = useCallback( ({ email, password }: IUser) => {
    return new Promise((resolve, reject) => {
      auth0.signup({
        email,
        password,
        connection: 'Username-Password-Authentication',
      }, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  }, []);

  const onLogin = useCallback(({ email, password }: IUser) => {
    return new Promise((resolve, reject) => {
      auth0.login({
        email,
        password,
      }, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  }, []);

  return (
    <AuthControllerContext.Provider
      value={{
        onSignUp,
        onLogin,
        updateToken,
        token,
      }}
    >
      {children}
    </AuthControllerContext.Provider>
  );
};

