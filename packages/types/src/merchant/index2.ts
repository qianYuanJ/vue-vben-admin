/**
 * BuyerBusinessSettledOrderDto
 */
export interface Request {
  /**
   * 审核不通过原因
   */
  audit_reason?: string;
  /**
   * 付款人银行卡号
   */
  bank_card_no?: string;
  /**
   * 付款人开户行
   */
  bank_deposit_name?: string;
  /**
   * 订单创建时间
   */
  create_time?: Date;
  /**
   * 优惠金额
   */
  discount_price?: number;
  /**
   * 审核状态 1:待审核 2: 已通过 3：待商家修改
   */
  examine_status?: string;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 信息技术服务费
   */
  information_fee?: number;
  /**
   * 主营业务：1：主营个人业务，2：主营企业业务
   */
  main_business?: string;
  /**
   * 企业名称
   */
  name?: string;
  /**
   * 审核人姓名
   */
  operator_name?: string;
  /**
   * 审核人id
   */
  operator_user_id?: string;
  /**
   * 支付状态1:已支付 2:待支付 3：已取消
   */
  pay_status?: string;
  /**
   * 付款人名称
   */
  payee_name?: string;
  /**
   * 实付价格
   */
  payment_amount?: number;
  /**
   * 订单价格
   */
  payment_amount_all?: number;
  /**
   * 付款时间
   */
  payment_time?: Date;
  /**
   * 产品服务id
   */
  product_configuration_service_id?: string;
  /**
   * 服务包费
   */
  service_fee?: number;
  /**
   * 入驻途径
   */
  settled_way?: string;
  /**
   * 修改时间
   */
  updated_time?: Date;
  [property: string]: any;
}
