/* eslint-disable no-case-declarations */
import {
  ReactElement, createContext, useContext,
  useEffect, useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppStore, useUserStore, useChatsStore } from '../stores';
import { AppRouteNames } from '../constants';

interface ISocketIOContext {
  socketIO: Socket | null,
  enterChatSocketIORoom: (chatId: string) => void,
  leaveChatSocketIORoom: (chatId: string) => void,
  sendChatMessage: (chatId: string, content: string) => void,
  ready: boolean,
}

enum NotificationType {
  MessageNotification = 'MESSAGE_NOTIFICATION',
}

interface IMessageNotificationAttributes {
  chatId: string;
}

interface IDefaultNotification<T = string, A = object> {
  type: T;
  title: string;
  description: string;
  attributes: A;
}

// eslint-disable-next-line max-len
type IMessageNotification = IDefaultNotification<NotificationType.MessageNotification, IMessageNotificationAttributes>;

type INotification = IMessageNotification | IDefaultNotification;

const SocketIOContext = createContext({} as ISocketIOContext);

export const useSocketIO = () => useContext<ISocketIOContext>(SocketIOContext);

export const SocketIOProvider = (): ReactElement => {
  const { token } = useAppStore();
  const { me } = useUserStore();
  const { loadChats } = useChatsStore();
  const navigate = useNavigate();
  const [socketIO, setSocketIO] = useState<Socket | null>(null);
  const [ready, setReady] = useState(false);

  const handleNotification = (notificationJSON: string) => {
    const notification: INotification = JSON.parse(notificationJSON);
    switch (notification.type) {
      case NotificationType.MessageNotification:
        const { chatId } = notification.attributes as IMessageNotificationAttributes;
        const chatPath = AppRouteNames.chat.replace(':id', chatId);
        // TODO do not show toast for current chat
        toast(notification.title, { onClick: () => navigate(chatPath), type: 'info' });
        return loadChats();
      default:
        return () => {};
    }
  };

  useEffect(() => {
    if (token && me?.participant?.id && me?.default_tenant) {
      const socket = io(import.meta.env.VITE_SOCKETS_URL, {
        auth: {
          token,
          participantId: me?.participant?.id,
          tenantId: me.default_tenant,
        },
        transports: ['websocket'],
      });
      socket.on('NOTIFICATION', (notification) => handleNotification(notification));
      socket.on('READY', () => setReady(true));
      setSocketIO(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, navigate, token]);

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
        ready,
      }}
    >
      <Outlet />
    </SocketIOContext.Provider>
  );
};
