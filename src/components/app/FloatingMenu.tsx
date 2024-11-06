import { ReactElement } from 'react';
import { MessageOutlined, MoreOutlined, FileAddOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useHasPermissions } from '../../hooks';
import { Permissions } from '../../constants';

interface MenuItemProps {
  Icon: () => ReactElement,
  permissions: Permissions[],
}

const menuItems: Array<MenuItemProps & { item: string }> = [{
  item: 'message',
  Icon: MessageOutlined as unknown as () => ReactElement,
  permissions: [Permissions.CAN_SEND_MESSAGES],
}, {
  item: 'disease',
  Icon: FileAddOutlined as unknown as () => ReactElement,
  permissions: [Permissions.CAN_CREATE_DISEASES],
}];

const FloatingMenuItem = ({ Icon, permissions }: MenuItemProps): ReactElement | null => {
  const hasPermission = useHasPermissions(permissions);
  return hasPermission ? <FloatButton icon={<Icon />} /> : null;
};

const FloatingMenu = (): ReactElement => (
  <FloatButton.Group
    trigger="click"
    type="primary"
    style={{ insetInlineEnd: 24 }}
    icon={<MoreOutlined />}
  >
    {menuItems.map((item) => <FloatingMenuItem key={`floating-menu-item-${item.item}`} {...item} />)}
  </FloatButton.Group>
);

export default FloatingMenu;
