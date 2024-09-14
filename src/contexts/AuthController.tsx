/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useContext, ReactNode,
  useCallback, ReactElement, useState,
} from 'react';
import { WebAuth } from 'auth0-js';
import { IUser } from '../types';

interface IAuthController {
  onSignUp: (user: Pick<IUser, 'email' | 'password' | 'last_name' | 'first_name'>) => Promise<unknown>,
  onLogin: (user: Pick<IUser, 'email' | 'password'>) => Promise<unknown>,
  onLogOut: () => void,
  onGoogleSignIn: () => void,
  isAuthorized: boolean,
  updateToken: (token: string | null) => void,
}

const auth0 = new WebAuth({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: 'http://localhost:3000/authCallback',
  responseType: 'token id_token',
  scope: 'openid email profile',
});

const AuthControllerContext = createContext<IAuthController>({} as IAuthController);

export const useAuth = (): IAuthController => useContext(AuthControllerContext);

export const AuthControllerProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [token, setToken] = useState<string | null>(null);

  const updateToken = useCallback((newToken: string | null) => setToken(newToken), []);

  const onSignUp = useCallback(({
    email, password, first_name, last_name,
  }: object) => new Promise((resolve, reject) => {
    auth0.signup({
      email,
      password,
      userMetadata: {
        first_name,
        last_name,
      },
      connection: 'Username-Password-Authentication',
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  }), []);

  const onLogin = useCallback(({ email, password }: object) => new Promise((resolve, reject) => {
    auth0.login({
      email,
      password,
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  }), []);

  const onLogOut = useCallback(() => {
    auth0.logout({ returnTo: 'http://localhost:3000/' });
    updateToken(null);
  }, [updateToken]);

  const onGoogleSignIn = () => auth0.authorize({ connection: 'google-oauth2' });

  return (
    <AuthControllerContext.Provider
      value={{
        isAuthorized: !!token,
        onSignUp,
        onLogin,
        onLogOut,
        onGoogleSignIn,
        updateToken,
      }}
    >
      {children}
    </AuthControllerContext.Provider>
  );
};