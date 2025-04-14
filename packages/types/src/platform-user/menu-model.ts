/**
 * MenuModel
 */
export interface MenuModel {
  component?: string;
  hide_in_menu?: boolean;
  icon?: string;
  id?: string;
  menu_type?: string;
  name?: string;
  parent_id?: string;
  path?: string;
  perms?: string;
  remark?: string;
  role_menu_id?: string;
  site?: string;
  sort?: number;
  source?: string;
  url?: string;
  [property: string]: any;
}
