import type { FactoryUphold } from './factory-uphold';
import type { RoleModel } from './role-model';

/**
 * PlatformUser
 */
export interface PlatformUser {
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
