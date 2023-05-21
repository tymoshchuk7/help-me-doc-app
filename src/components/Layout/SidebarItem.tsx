import React, { ReactElement, ReactNode } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  title: string,
  to: string,
  icon: ReactNode,
}

const SidebarItem = ({ title, to, icon }: Props): ReactElement => {

  return (
    <Menu.Item>
      <Link to={to} className="ml-2">
        {icon}
        <span className="ml-2">{title}</span>
      </Link>
    </Menu.Item>
  );
};

export default SidebarItem;