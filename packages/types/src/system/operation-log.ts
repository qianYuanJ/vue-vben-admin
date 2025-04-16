/**
 * OperateLog
 */
export interface OperateLog {
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 操作账号
   */
  operate_phone?: string;
  /**
   * 操作结果
   */
  operate_state?: string;
  /**
   * 操作类型
   */
  operate_type?: string;
  /**
   * 请求报文
   */
  parameter?: string;
  /**
   * 请求方式
   */
  request_method?: string;
  /**
   * 请求路径
   */
  request_url?: string;
  /**
   * 响应报文
   */
  return_value?: string;
  [property: string]: any;
}
