import { ReactElement } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import { Form, DatePicker as AntDesignDatePicker } from 'antd';

interface Props {
  label: string,
  name: NamePath,
  rules: Rule[],
  validationTrigger?: 'onBlur' | 'onChange',
}

const DatePicker = ({ label, name, rules, validationTrigger = 'onBlur' } : Props): ReactElement => (
  <Form.Item label={label} name={name} rules={rules} validateTrigger={validationTrigger}>
    <AntDesignDatePicker showTime={{ format: 'HH:mm' }} />
  </Form.Item>
);

export default DatePicker;
