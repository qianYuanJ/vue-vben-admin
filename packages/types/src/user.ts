import type { BasicUserInfo } from '@vben-core/typings';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 用户描述
   */
  desc: string;
  /**
   * 首页地址
   */
  homePath: string;

  /**
   * accessToken
   */
  token: string;
}

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

/**
 * 站台
 */
export interface FactoryUphold {
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 煤矿或煤厂ID
   */
  factory_id?: string;
  /**
   * 煤矿煤厂汇总名称
   */
  factory_name?: string;
  /**
   * 厂家排序
   */
  factory_sort?: number;
  /**
   * 厂家类型
   */
  factory_type?: string;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 用户ID
   */
  user_id?: string;
  [property: string]: any;
}

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

/**
 * UserInfo
 */
export interface IUserInfo {
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 部门ID
   */
  department_id?: string;
  /**
   * 部门名称
   */
  department_name?: string;
  /**
   * 部门集合
   */
  departmentIds?: string[];
  /**
   * token过期时间
   */
  expire: Date;
  factoryUphold?: FactoryUphold[];
  /**
   * 是否被分配
   */
  flag?: boolean;
  /**
   * 头像
   */
  head_pic?: string;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 岗位
   */
  job?: string;
  /**
   * 姓名
   */
  nickname?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 区域ID
   */
  region_id?: string;
  /**
   * 是否为区域负责人（0：否，1：是）
   */
  region_manager?: boolean;
  /**
   * 区域名称
   */
  region_name?: string;
  /**
   * 角色数字ID
   */
  role_ids?: string[];
  /**
   * 角色
   */
  roles?: RoleModel[];
  /**
   * 性别
   */
  sex?: string;
  /**
   * 令牌
   */
  token?: string;
  /**
   * 角色用户关联ID
   */
  ur_id?: string;
  /**
   * 公共用户ID
   */
  user_id?: string;
  [property: string]: any;
}

export type { UserInfo };
