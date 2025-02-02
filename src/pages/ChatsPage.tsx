import { ReactElement, useMemo } from 'react';
import { Typography, Skeleton } from 'antd';
import { NavLink } from 'react-router-dom';
import { useChatsStore } from '../stores';
import { useDispatchPromise } from '../hooks';
import { ChatCard, Resolve } from '../components';
import { ITenantChat, IChatPartner } from '../types';

const { Title } = Typography;

const skeletonArray = new Array(5).fill(0);

const ChatsPage = (): ReactElement => {
  const { chats, lastMessages } = useChatsStore();

  const lastMessagesMap = useMemo(
    () => Object.fromEntries(lastMessages.map((message) => [message.chat_id, message])),
    [lastMessages],
  );

  return (
    <div>
      {chats?.length !== 0 ? chats.map((chat: ITenantChat & IChatPartner) => (
        <NavLink key={`chat-${chat.id}`} to={`/chats/${chat.id}`}>
          <ChatCard
            avatarSrc={chat.chat_partner_avatar}
            name={`${chat.chat_partner_first_name} ${chat.chat_partner_last_name}`}
            // eslint-disable-next-line
            showUnreadMessageBadge={lastMessagesMap[chat.id] ? !lastMessagesMap[chat.id].is_read : false}
          />
        </NavLink>
      )) : <div>You haven’t created any chats yet. Start your first one now!!</div>}
    </div>
  );
};

const ChatsPageContainer = () => {
  const { loadChats } = useChatsStore();
  const loadChatsPromise = useDispatchPromise(loadChats);

  return (
    <div>
      <Title level={4}>Your chats</Title>
      <Resolve
        promises={[loadChatsPromise]}
        loader={(
          <div>
            {skeletonArray.map((_, index) => (
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
        {() => <ChatsPage />}
      </Resolve>
    </div>
  );
};

export default ChatsPageContainer;
