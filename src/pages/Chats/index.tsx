import React, { ReactElement } from 'react';
import { useDispatchPromise } from '../../hooks';
import { loadChats } from '../../redux/chatsReducer';
import { Resolve, PageLayout } from '../../components';
import ChatsList from './ChatsList';

const Chats = (): ReactElement => {
  const loadChatsPromise = useDispatchPromise(loadChats());

  return (
    <Resolve promises={[loadChatsPromise]}>
      {() => (
        <PageLayout>
          <ChatsList />
        </PageLayout>
      )}
    </Resolve>
  );
};

export default Chats;