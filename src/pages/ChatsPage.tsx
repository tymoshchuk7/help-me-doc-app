import { ReactElement } from 'react';
import { Typography, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useChatsStore } from '../stores';
import { useDispatchPromise } from '../hooks';
import { AppPageLayout, Resolve } from '../components';
import { ITenantChat, IChatPartner } from '../types';

const { Title } = Typography;
const { Meta } = Card;

const ChatsPage = (): ReactElement => {
  const { loadChats } = useChatsStore();
  const loadChatsPromise = useDispatchPromise(loadChats);

  return (
    <AppPageLayout>
      <Title level={4}>Your chats</Title>
      <Resolve promises={[loadChatsPromise]}>
        {(data) => (
          <div>
            {data.data.chats.map((chat: ITenantChat & IChatPartner) => (
              <Card key={`chat-${chat.id}`} style={{ maxWidth: 400, marginBottom: 12 }}>
                <Meta
                  avatar={(
                    <Avatar
                      src={chat.chat_partner_avatar}
                      icon={!chat.chat_partner_avatar ? <UserOutlined /> : null}
                    />
                  )}
                  title={`${chat.chat_partner_first_name} ${chat.chat_partner_last_name}`}
                />
              </Card>
            ))}
          </div>
        )}
      </Resolve>
    </AppPageLayout>
  );
};

export default ChatsPage;
