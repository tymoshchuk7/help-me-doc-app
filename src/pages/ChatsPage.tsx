import { ReactElement } from 'react';
import { Typography, Skeleton } from 'antd';
import { NavLink } from 'react-router-dom';
import { useChatsStore } from '../stores';
import { useDispatchPromise } from '../hooks';
import { ChatCard, Resolve } from '../components';
import { ITenantChat, IChatPartner } from '../types';

const { Title } = Typography;

const skeletonArray = new Array(5).fill(0);

const ChatsPage = (): ReactElement => {
  const { loadChats } = useChatsStore();
  const loadChatsPromise = useDispatchPromise(loadChats);

  return (
    <>
      <Title level={4}>Your chats</Title>
      <Resolve
        promises={[loadChatsPromise]}
        loader={(
          <div>
            {skeletonArray.map((item, index) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key
                key={`chat-page-skeleton-${index}`}
                className="mt-20"
                active
                avatar
                paragraph={{ rows: 0 }}
              />
            ))}
          </div>
        )}
      >
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
