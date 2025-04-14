import type { MenuModel } from './menu-model';

/**
 * 角色
 */
export interface RoleModel {
  code?: string;
  company_id?: string;
  created_time?: Date;
  id?: string;
  menuIdList?: MenuModel[];
  name?: string;
  source?: string;
  system_role?: number;
  updated_time?: Date;
  [property: string]: any;
}
