import { ReactElement } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import { Form, Input } from 'antd';

const { TextArea } = Input;

interface Props {
  label?: string,
  name: NamePath,
  placeholder: string,
  rules: Rule[],
  validationTrigger?: 'onBlur' | 'onChange',
  disabled?: boolean,
}

const AuthPageInput = ({
  label, name, rules, placeholder, validationTrigger = 'onBlur', disabled,
}: Props): ReactElement => (
  <Form.Item label={label} name={name} rules={rules} validateTrigger={validationTrigger}>
    <TextArea
      rows={4}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={1024}
      style={{ resize: 'none' }}
    />
  </Form.Item>
);

export default AuthPageInput;
