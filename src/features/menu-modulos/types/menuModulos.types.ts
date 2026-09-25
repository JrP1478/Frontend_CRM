import type {
  CrmIconName,
} from '@shared/icons/crm';

import type {
  MenuModuloAction,
} from '../constants/menuModuloActions.constants';

export type MenuModuloIconName =
  CrmIconName;

export interface MenuModulo {
  key: string;
  label: string;
  breadcrumbLabel?: string;
  descripcion: string;
  icon: MenuModuloIconName;
  path?: string;
  action?: MenuModuloAction;
  children?: MenuModulo[];
  isEnabled?: boolean;
  badge?: string;
}
