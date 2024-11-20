import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatsStore } from '../../stores';
import { useDispatchPromise } from '../../hooks';
import { useSocketIO } from '../../contexts';
import { AppPageLayout, Resolve } from '../../components';
import Chat from './Chat';

const ChatPage = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { retrieveChat } = useChatsStore();
  const retrieveChatPromise = useDispatchPromise(() => retrieveChat(id as string));

  return (
    <AppPageLayout>
      <Resolve promises={[retrieveChatPromise]}>
        {({ data }) => <Chat chat={data.chat} messages={data.messages} />}
      </Resolve>
    </AppPageLayout>
  );
};

const ChatPageContainer = (): ReactElement | null => {
  const { id } = useParams<{ id: string }>();
  const { enterChatSocketIORoom, leaveChatSocketIORoom } = useSocketIO();
  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    if (id) {
      enterChatSocketIORoom(id);
      setRenderPage(true);
      return () => leaveChatSocketIORoom(id);
    }
    return () => {};
    // eslint-disable-next-line
  }, []);

  return renderPage ? <ChatPage /> : null;
};

export default ChatPageContainer;
