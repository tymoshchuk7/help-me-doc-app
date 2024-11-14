import { Rule } from 'antd/lib/form';

type ValidatorKey = 'recipient' | 'content';

export const messageValidator: Record<ValidatorKey, Rule[]> = {
  recipient: [{
    required: true,
    message: 'Please select recipient.',
  }],
  content: [{
    required: true,
    message: 'Message should be not empty.',
  }],
} as const;
