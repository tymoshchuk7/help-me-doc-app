import { ReactElement } from 'react';
import { Avatar, Card, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface Props {
  avatarSrc?: string | null,
  name: string,
  showUnreadMessageBadge: boolean,
}

const ChatCard = ({ name, avatarSrc, showUnreadMessageBadge }: Props): ReactElement => (
  <Card style={{ maxWidth: 400, marginBottom: 12 }} className="position-relative">
    <Meta
      avatar={(
        <Avatar
          src={avatarSrc}
          icon={!avatarSrc ? <UserOutlined /> : null}
        />
      )}
      title={name}
    />
    {showUnreadMessageBadge && (
      <div className="position-absolute unread-chat-badge-container">
        <Badge count={' '} color="#1668dc" />
      </div>
    )}
  </Card>
);

export default ChatCard;
