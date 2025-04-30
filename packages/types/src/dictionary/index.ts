/**
 * TradeDictionaryDto
 */
export interface RequestDictionaryParams {
  /**
   * 字典参数
   */
  dictionary_code?: string;
  /**
   * 字典名称
   */
  dictionary_name?: string;
  /**
   * 排序字段
   */
  dictionary_sort?: number;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 父级字典参数
   */
  parent?: string;
  /**
   * 父级字典id
   */
  parent_id?: string;
  [property: string]: any;
}

/**
 * 煤贸字典管理
 */
export interface Dictionary {
  /**
   * 统计数字
   */
  count?: number;
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 字典参数
   */
  dictionary_code?: string;
  /**
   * 字典名称
   */
  dictionary_name?: string;
  /**
   * 排序字段
   */
  dictionary_sort?: number;
  /**
   * 唯一标识
   */
  id?: string;
  nodes?: Dictionary[];
  /**
   * 父级字典参数
   */
  parent?: string;
  /**
   * 父级字典id
   */
  parent_id: string;
  [property: string]: any;
}
