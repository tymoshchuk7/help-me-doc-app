import { AxiosError } from 'axios';

export interface IUser {
  id: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  avatar: string,
  default_tenant: string,
}

export interface ITenant {
  name: string,
}

export interface APIResult<R> {
  hasError: boolean,
  data?: R,
  error?: AxiosError,
}
