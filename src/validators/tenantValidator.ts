import { Rule } from 'antd/lib/form';
import { ITenant } from '../types';

export const tenantValidator: Record<keyof ITenant, Rule[]> = {
  name: [{
    required: true,
    message: 'Please enter workspace name.',
  }, {
    max: 150,
    message: 'Workspace name must be max 150 characters long.',
  }, {
    pattern: /^[a-zA-Z0-9.,/ ]+$/,
    message: 'Workspace name can only contain letters, numbers, dots, commas, and slashes.',
  }],
} as const;
