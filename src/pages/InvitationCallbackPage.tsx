import { ReactElement, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import { useAsyncEffect } from '../hooks';
import { useInvitationsStore } from '../stores';

const InvitationCallback = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { retrieveInvitation } = useInvitationsStore();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null | undefined>(null);

  useAsyncEffect(async () => {
    try {
      if (!id) {
        return;
      }
      const { hasError } = await retrieveInvitation(id);
      if (!hasError) {
        navigate('/signup');
      }
    } catch (e) {
      setApiError((e as Error).toString());
    }
  }, []);

  if (apiError) {
    return (
      <div className="min-height-100vh flex justify-center align-center">
        <Alert type="error" description={apiError} />
      </div>
    );
  }

  return (
    <>
    </>
  );
};

export default InvitationCallback;
