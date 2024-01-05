import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { RootState } from '../../store';

const ChatsList = (): ReactElement => {
  const allChats = useSelector(({ chats }: RootState) => chats.data);
  const allParticipants = useSelector(({ participants }: RootState) => participants.data);
  const allUsers = useSelector(({ user }: RootState) => user.data);

  return (
    <div>
      <h2>Your chats</h2>
      {Object.values(allChats).map((chat) => (
        <Card style={{ marginBottom: 15 }} className="cursor-pointer" key={chat.id}>
          {allUsers[allParticipants[chat.otherParticipant].user_id].first_name}
          &nbsp;
          {allUsers[allParticipants[chat.otherParticipant].user_id].last_name}
        </Card>
      ))}
    </div>
  );
};

export default ChatsList;