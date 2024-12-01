import { ReactElement, ReactNode } from 'react';
import { Alert, Flex, theme } from 'antd';

interface Props {
  children: ReactNode,
  errorMessage: string | null | undefined,
}

const AuthPageLayout = ({ children, errorMessage }: Props): ReactElement => {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Flex
      justify="center"
      align="center"
      style={{ minHeight: '100vh', background: colorBgContainer }}
    >
      <div style={{ flex: 1, maxWidth: 500, padding: 20 }}>
        {children}
        {errorMessage ? <Alert description={errorMessage} type="error" style={{ marginTop: 20 }} /> : <div />}
      </div>
    </Flex>
  );
};

export default AuthPageLayout;
