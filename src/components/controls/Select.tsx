import { ReactElement, ReactNode } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import { Form, Select } from 'antd';

interface Props {
  label: string,
  name: NamePath,
  placeholder: string,
  rules: Rule[],
  validationTrigger?: 'onBlur' | 'onChange',
  children: ReactNode,
}

const AuthPageInput = ({
  label, name, rules, placeholder, validationTrigger = 'onBlur', children,
}: Props): ReactElement => (
  <Form.Item label={label} name={name} rules={rules} validateTrigger={validationTrigger}>
    <Select placeholder={placeholder} allowClear>
      {children}
    </Select>
  </Form.Item>
);

export default AuthPageInput;
