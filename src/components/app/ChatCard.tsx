import { ReactElement } from 'react';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface Props {
  avatarSrc?: string | null,
  name: string,
}

const ChatCard = ({ name, avatarSrc }: Props): ReactElement => (
  <Card style={{ maxWidth: 400, marginBottom: 12 }}>
    <Meta
      avatar={(
        <Avatar
          src={avatarSrc}
          icon={!avatarSrc ? <UserOutlined /> : null}
        />
      )}
      title={name}
    />
  </Card>
);

export default ChatCard;
