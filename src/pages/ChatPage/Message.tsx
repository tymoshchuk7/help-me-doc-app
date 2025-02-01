import { ReactElement, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { encryptionClient } from '../../helpers';
import { IChatPartner, ITenantChat, ITenantMessage } from '../../types';
import { useChatsStore } from '../../stores';

const OwnMessage = ({ message }: { message: ITenantMessage }): ReactElement => (
  <div className="flex justify-end position-relative" id={`chat-message-${message.id}`}>
    <div className="chat-message sent-message">
      {encryptionClient.decryptMessage(message.content)}
      <CheckOutlined
        className="d-block position-absolute message-checked"
        style={{ right: 8 }}
      />
      {message.is_read && (
        <CheckOutlined
          className="d-block position-absolute message-checked"
          style={{ right: 5 }}
        />
      )}
    </div>
  </div>
);

const ReceivedMessage = ({ message }: { message: ITenantMessage }): ReactElement => (
  <div className="flex justify-start" id={`chat-message-${message.id}`}>
    <div className="chat-message received-message">
      {encryptionClient.decryptMessage(message.content)}
    </div>
  </div>
);

interface Props {
  chat: ITenantChat & IChatPartner,
  message: ITenantMessage,
}

const Message = ({ chat, message }: Props): ReactElement => {
  const ownMessage = chat.me_chat_member_id === message.chat_member_id;
  const { markMessageAsRead } = useChatsStore();

  useEffect(() => {
    if (!ownMessage) {
      const observer = new IntersectionObserver(() => markMessageAsRead(message.id), {
        rootMargin: '0px',
        threshold: 1.0,
      });
      const target = document.querySelector(`#chat-message-${message.id}`);
      observer.observe(target);
      return () => {
        observer.unobserve(target);
      };
    }
    return () => {};
    // eslint-disable-next-line
  }, []);

  return ownMessage ? <OwnMessage message={message} /> : <ReceivedMessage message={message} />;
};

export default Message;
