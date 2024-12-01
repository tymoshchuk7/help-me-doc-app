import { ReactElement } from 'react';
import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { useChatsStore } from '../stores';
import { useDispatchPromise } from '../hooks';
import { ChatCard, Resolve } from '../components';
import { ITenantChat, IChatPartner } from '../types';

const { Title } = Typography;

const ChatsPage = (): ReactElement => {
  const { loadChats } = useChatsStore();
  const loadChatsPromise = useDispatchPromise(loadChats);

  return (
    <>
      <Title level={4}>Your chats</Title>
      <Resolve promises={[loadChatsPromise]}>
        {({ data }) => (
          <div>
            {data?.chats?.length !== 0 ? data.chats.map((chat: ITenantChat & IChatPartner) => (
              <NavLink key={`chat-${chat.id}`} to={`/chats/${chat.id}`}>
                <ChatCard
                  avatarSrc={chat.chat_partner_avatar}
                  name={`${chat.chat_partner_first_name} ${chat.chat_partner_last_name}`}
                />
              </NavLink>
            )) : <div>You haven’t created any chats yet. Start your first one now!!</div>}
          </div>
        )}
      </Resolve>
    </>
  );
};

export default ChatsPage;
