import {
  createContext, useContext, ReactNode,
  useCallback, ReactElement,
} from 'react';
import { useDispatch } from 'react-redux';
import { WebAuth } from 'auth0-js';
import { updateToken, preserveTenantCreate } from '../redux/appReducer';
import { IUser } from '../types';

interface IAuthController {
  onSignUp: (dto: IUser) => Promise<unknown>,
  onLogin: (dto: Pick<IUser, 'email' | 'password'>) => Promise<unknown>,
  onLogOut: () => void,
  onGoogleSignIn: () => void,
}

const auth0 = new WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: 'http://localhost:3000/authCallback',
  responseType: 'token id_token',
  scope: 'openid email profile',
});

const AuthControllerContext = createContext<IAuthController>({} as IAuthController);

export const useAuth = (): IAuthController => useContext(AuthControllerContext);

export const AuthControllerProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const dispatch = useDispatch();

  const onSignUp = useCallback( ({ email, password, first_name, last_name }: IUser) => {
    return new Promise((resolve, reject) => {
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
        dispatch(preserveTenantCreate(email));
        return resolve(result);
      });
    });
  }, [dispatch]);

  const onLogin = useCallback(({ email, password }: Pick<IUser, 'email' | 'password'>) => {
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

  const onLogOut = useCallback(() => {
    auth0.logout({ returnTo: 'http://localhost:3000/' });
    dispatch(updateToken(null));
  }, [dispatch]);

  const onGoogleSignIn = () => auth0.authorize({ connection: 'google-oauth2' });

  return (
    <AuthControllerContext.Provider
      value={{
        onSignUp,
        onLogin,
        onLogOut,
        onGoogleSignIn,
      }}
    >
      {children}
    </AuthControllerContext.Provider>
  );
};

