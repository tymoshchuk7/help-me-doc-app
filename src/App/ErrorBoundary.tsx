import { Component, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Alert } from 'antd';

interface State {
  error: null | Error | string,
}

export default class ErrorBoundary extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error | string): void {
    this.setState({ error });
  }

  render(): ReactNode {
    const { error } = this.state;

    if (error) {
      return (
        <div className="min-height-100vh flex align-center justify-center p-20">
          <Alert type="error" description={String(error)} />
        </div>
      );
    }

    return <Outlet />;
  }
}
