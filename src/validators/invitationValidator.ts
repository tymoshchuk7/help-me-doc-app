import { Rule } from 'antd/lib/form';
import { IInvitation } from '../types';

type ValidatorKey = keyof Pick<IInvitation, 'email' | 'role'>;

export const invitationValidator: Record<ValidatorKey, Rule[]> = {
  email: [{
    required: true,
    type: 'email',
    message: 'Please enter your email address.',
  }],
  role: [{
    required: true,
    enum: ['admin', 'patient', 'doctor'],
    message: 'Please select one of the following roles.',
  }],
} as const;
