import { ReactElement } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Page404 = (): ReactElement => {
  const navigate = useNavigate();

  const handleBackHome = () => navigate('/');

  return (
    <div className="min-height-100vh flex justify-center align-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={(
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        )}
      />
    </div>
  );
};

export default Page404;
