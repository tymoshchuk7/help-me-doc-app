import { Rule } from 'antd/lib/form';
import { CreateInvitationDTO } from '../types';

export const invitationValidator: Record<keyof CreateInvitationDTO, Rule[]> = {
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
