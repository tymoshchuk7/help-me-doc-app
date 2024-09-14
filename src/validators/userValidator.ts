import { Rule } from 'antd/lib/form';
import { IUser } from '../types';

type ValidatorKey = keyof Pick<IUser, 'email' | 'first_name' | 'last_name' | 'password'>;

export const userValidator: Record<ValidatorKey, Rule[]> = {
  email: [{ required: true, type: 'email', message: 'Please enter your email address.' }],
  first_name: [{
    required: true,
    message: 'Please enter your password',
  }, {
    max: 150,
    message: 'First name must be max 150 characters long.',
  }],
  last_name: [{
    required: true,
    message: 'Please enter your password',
  }, {
    max: 150,
    message: 'Last name must be max 150 characters long.',
  }],
  password: [{
    required: true,
    message: 'Please enter your password',
  }, {
    min: 6,
    message: 'Password must be at least 6 characters long.',
  }, {
    pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
    message: 'Password must contain at least one uppercase letter and one number.',
  }],
} as const;
