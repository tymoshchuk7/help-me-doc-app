import { ReactElement } from 'react';
import { MessageOutlined, MoreOutlined, FileAddOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useHasPermissions } from '../../hooks';
import { Permissions } from '../../constants';

export type ModalType = 'message' | 'disease';

interface MenuItemProps {
  item: ModalType
  Icon: () => ReactElement,
  permissions: Permissions[],
}

const menuItems: MenuItemProps[] = [{
  item: 'message',
  Icon: MessageOutlined as unknown as () => ReactElement,
  permissions: [Permissions.CAN_SEND_MESSAGES],
}, {
  item: 'disease',
  Icon: FileAddOutlined as unknown as () => ReactElement,
  permissions: [Permissions.CAN_CREATE_DISEASES],
}];

const FloatingMenuItem = (
  { Icon, permissions, onClick, item }: MenuItemProps & { onClick: (item: ModalType) => void },
): ReactElement | null => {
  const hasPermission = useHasPermissions(permissions);
  return hasPermission ? <FloatButton icon={<Icon />} onClick={() => onClick(item)} /> : null;
};

const FloatingMenu = ({ onClick }: { onClick: (item: ModalType) => void }): ReactElement => (
  <FloatButton.Group
    trigger="click"
    type="primary"
    style={{ insetInlineEnd: 24 }}
    icon={<MoreOutlined />}
  >
    {menuItems.map((item) => (
      <FloatingMenuItem
        key={`floating-menu-item-${item.item}`}
        onClick={onClick}
        {...item}
      />
    ))}
  </FloatButton.Group>
);

export default FloatingMenu;
