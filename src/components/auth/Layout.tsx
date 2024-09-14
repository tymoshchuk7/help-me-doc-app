import React, { ReactElement, ReactNode } from 'react';
import {
  Alert, Flex,
} from 'antd';

interface Props {
  children: ReactNode,
  errorMessage: string | null,
}

const AuthPageLayout = ({ children, errorMessage }: Props): ReactElement => (
  <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
    <div style={{ flex: 1, maxWidth: 600, padding: 20 }}>
      {children}
      {errorMessage ? <Alert description={errorMessage} type="error" style={{ marginTop: 20 }} /> : <div />}
    </div>
  </Flex>
);

export default AuthPageLayout;
