import {
  ReactElement, createContext, useContext,
  useEffect, ReactNode, useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppStore, useUserStore } from '../stores';

interface ISocketIOContext {
  socketIO: Socket | null,
  enterChatSocketIORoom: (chatId: string) => void,
  leaveChatSocketIORoom: (chatId: string) => void,
  sendChatMessage: (chatId: string, content: string) => void,
}

const SocketIOContext = createContext({} as ISocketIOContext);

export const useSocketIO = () => useContext<ISocketIOContext>(SocketIOContext);

export const SocketIOProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const { token } = useAppStore();
  const { me } = useUserStore();
  const [socketIO, setSocketIO] = useState<Socket | null>(null);

  useEffect(() => {
    if (token && me?.participant?.id && me.default_tenant) {
      const socket = io('http://localhost:8000', {
        auth: {
          token,
          participantId: me?.participant?.id,
          tenantId: me.default_tenant,
        },
        transports: ['websocket'],
      });
      setSocketIO(socket);
    }
  }, [me, token]);

  const enterChatSocketIORoom = (chatId: string) => socketIO?.emit('ENTER_CHAT_ROOM', chatId);
  const leaveChatSocketIORoom = (chatId: string) => socketIO?.emit('LEAVE_CHAT_ROOM', chatId);
  const sendChatMessage = (chatId: string, content: string) => {
    if (me?.participant?.id) {
      socketIO?.emit('CHAT_MESSAGE', JSON.stringify({
        participantId: me.participant.id,
        chatId,
        content,
      }));
    }
  };

  return (
    <SocketIOContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        socketIO,
        enterChatSocketIORoom,
        leaveChatSocketIORoom,
        sendChatMessage,
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};
