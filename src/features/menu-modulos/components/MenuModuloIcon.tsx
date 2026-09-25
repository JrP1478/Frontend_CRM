import type React from 'react';

import {
  CrmIcon,
} from '@shared/icons/crm';

import type {
  MenuModuloIconName,
} from '../types';

interface MenuModuloIconProps {
  name: MenuModuloIconName;
}

export const MenuModuloIcon: React.FC<
  MenuModuloIconProps
> = ({ name }) => (
  <span className="menu-modulos-icon">
    <CrmIcon
      name={name}
      width={24}
      height={24}
      aria-hidden="true"
    />
  </span>
);

export default MenuModuloIcon;
