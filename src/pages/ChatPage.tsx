import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { useChatsStore, useUserStore } from '../stores';
import { useDispatchPromise } from '../hooks';
import { encryptionClient } from '../helpers';
import { ITenantMessage } from '../types';
import { AppPageLayout, Resolve, ChatCard } from '../components';

const { Title } = Typography;

const ChatPage = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { retrieveChat } = useChatsStore();
  const { me } = useUserStore();
  const retrieveChatPromise = useDispatchPromise(() => retrieveChat(id as string));

  return (
    <AppPageLayout>
      <Title level={4}>Chat with</Title>
      <Resolve promises={[retrieveChatPromise]}>
        {({ data }) => (
          <div>
            <ChatCard
              avatarSrc={data.chat.chat_partner_avatar}
              name={`${data.chat.chat_partner_first_name} ${data.chat.chat_partner_last_name}`}
            />
            {data.messages.map((message: ITenantMessage) => (
              <div key={message.id} className={`flex ${me?.id === message.user_id ? 'justify-end' : 'justify-start'}`}>
                <div className={`chat-message ${me?.id === message.user_id ? 'sent-message' : 'received-message'}`}>
                  {encryptionClient.decryptMessage(message.content)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Resolve>
    </AppPageLayout>
  );
};

export default ChatPage;
