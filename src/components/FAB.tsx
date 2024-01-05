import React, { ReactElement } from 'react';
import { CommentOutlined, EllipsisOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const FAB = ({ onOpenCrateChatModal }: { onOpenCrateChatModal: () => void }): ReactElement => {

  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ right: 24 }}
      icon={<EllipsisOutlined />}
    >
      <FloatButton icon={<CommentOutlined />} onClick={onOpenCrateChatModal} />
    </FloatButton.Group>
  );
};

export default FAB;