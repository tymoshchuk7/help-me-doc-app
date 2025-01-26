import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChatsStore } from '../../stores';
import { useDispatchPromise } from '../../hooks';
import { useSocketIO } from '../../contexts';
import { Resolve, Spinner } from '../../components';
import Chat from './Chat';

const ChatPage = (): ReactElement | null => {
  const { id } = useParams<{ id: string }>();
  const { enterChatSocketIORoom, leaveChatSocketIORoom } = useSocketIO();
  const { retrieveChat } = useChatsStore();
  const retrieveChatPromise = useDispatchPromise(() => retrieveChat(id as string));

  useEffect(() => {
    if (id) {
      enterChatSocketIORoom(id);
      return () => leaveChatSocketIORoom(id);
    }
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <Resolve promises={[retrieveChatPromise]}>
      {({ data }) => <Chat chat={data?.chat} messages={data?.messages || []} />}
    </Resolve>
  );
};

const ChatPageContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { ready } = useSocketIO();

  return ready ? <ChatPage key={id} /> : (
    <div className="w-100 flex justify-center align-center h-100">
      <Spinner />
    </div>
  );
};

export default ChatPageContainer;
