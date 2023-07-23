import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { useAsyncEffect } from '../hooks';
import { loadInvitation, acceptInvitation, preserveAcceptInvitation } from '../redux/invitationsReducer';

const InvitationCallback = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useAsyncEffect(async () => {
    try {
      if (!id) {
        return;
      }
      await dispatch(loadInvitation(id));
      const url = new URL(window.location.href);
      const userExists = url.searchParams.get('userExists') === 'true';
      dispatch(preserveAcceptInvitation(id));
      if (userExists) {
        await dispatch(acceptInvitation(id));
        navigate('/');
      } else {
        navigate('/signup');
      }
    } catch {}
  }, []);

  return (
    <>
    </>
  );
};

export default InvitationCallback;