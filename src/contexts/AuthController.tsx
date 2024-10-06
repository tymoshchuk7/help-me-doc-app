/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useContext, ReactNode,
  useCallback, ReactElement, useState,
} from 'react';
import { WebAuth } from 'auth0-js';
import { AUTH_TOKEN_KEY } from '../constants';
import { useAppStore } from '../stores';
import { IUser } from '../types';

interface IAuthController {
  onSignUp: (user: Pick<IUser, 'email' | 'password' | 'last_name' | 'first_name'>) => Promise<unknown>,
  onLogin: (user: Pick<IUser, 'email' | 'password'>) => Promise<unknown>,
  onLogOut: () => void,
  onGoogleSignIn: () => void,
  onChangePassword: (email: string) => Promise<unknown>,
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

enum AuthConnections {
  USERNAME_PASSWORD_AUTH = 'Username-Password-Authentication',
  GOOGLE_AUTH = 'google-oauth2',
}

export const AuthControllerProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const { setAuthToken } = useAppStore();
  const [token, setToken] = useState<string | null>(
    window.localStorage.getItem(AUTH_TOKEN_KEY) || null,
  );

  const updateToken = useCallback((newToken: string | null) => {
    setToken(newToken);
    setAuthToken(newToken);
  }, [setAuthToken]);

  const onSignUp: IAuthController['onSignUp'] = useCallback(({
    email, password, first_name, last_name,
  }: Pick<IUser, 'email' | 'password' | 'last_name' | 'first_name'>) => new Promise((resolve, reject) => {
    auth0.signup({
      email,
      password,
      userMetadata: {
        first_name,
        last_name,
      },
      connection: AuthConnections.USERNAME_PASSWORD_AUTH,
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  }), []);

  const onLogin = useCallback(({
    email, password,
  }: Pick<IUser, 'email' | 'password'>) => new Promise((resolve, reject) => {
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

  const onChangePassword = useCallback((email: string) => new Promise((resolve, reject) => {
    auth0.changePassword({
      connection: AuthConnections.USERNAME_PASSWORD_AUTH,
      email,
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  }), []);

  const onGoogleSignIn = () => auth0.authorize({ connection: AuthConnections.GOOGLE_AUTH });

  return (
    <AuthControllerContext.Provider
      value={{
        isAuthorized: !!token,
        onSignUp,
        onLogin,
        onLogOut,
        onChangePassword,
        onGoogleSignIn,
        updateToken,
      }}
    >
      {children}
    </AuthControllerContext.Provider>
  );
};
