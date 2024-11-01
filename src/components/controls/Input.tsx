import { ReactElement } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import { Form, Input } from 'antd';

interface Props {
  label: string,
  name: NamePath,
  placeholder: string,
  rules: Rule[],
  hideValue?: boolean,
  validationTrigger?: 'onBlur' | 'onChange',
  disabled?: boolean,
}

const AuthPageInput = ({
  label, name, rules, placeholder, hideValue, validationTrigger = 'onBlur', disabled,
}: Props): ReactElement => (
  <Form.Item label={label} name={name} rules={rules} validateTrigger={validationTrigger}>
    {hideValue ? (
      <Input.Password placeholder={placeholder} disabled={disabled} />
    ) : (
      <Input placeholder={placeholder} disabled={disabled} />
    )}
  </Form.Item>
);

export default AuthPageInput;
