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
