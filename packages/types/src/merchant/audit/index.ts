/**
 * ImBuyerFavourableProduct
 */
export interface ImBuyerFavourableProduct {
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 服务名称
   */
  favourable_product_name?: string;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 服务价格
   */
  payment_amount?: number;
  /**
   * 优惠活动
   */
  promotional_activities?: string;
  /**
   * 服务内容
   */
  service_content?: string;
  /**
   * 修改时间
   */
  updated_time?: Date;
  /**
   * 服务年限
   */
  year_number?: string;
  [property: string]: any;
}

/**
 * 商家入驻审核 列表项 接口响应数据
 */
export interface ImBuyerBusinessSettled {
  /**
   * 详细地址
   */
  address?: string;
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
   * 营业执照名称
   */
  business_license_name?: string;
  /**
   * 营业执照
   */
  business_license_photo?: string;
  /**
   * 城市
   */
  city?: string;
  /**
   * 城市-编码
   */
  city_code?: string;
  /**
   * 企业统一代码
   */
  company_union_id?: string;
  /**
   * 企业联系人
   */
  contacts?: string;
  /**
   * 联系人电话
   */
  contacts_phone?: string;
  /**
   * 国家
   */
  country?: string;
  /**
   * 国家-编号
   */
  country_code?: string;
  /**
   * 服务创建时间
   */
  create_time?: Date;
  /**
   * 优惠金额
   */
  discount_price?: number;
  /**
   * 区
   */
  district?: string;
  /**
   * 区-编码
   */
  district_code?: string;
  /**
   * 审核状态 1:待审核 2: 已通过 3：待商家修改
   */
  examine_status?: string;
  favourableProduct?: ImBuyerFavourableProduct;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 身份证号正面
   */
  id_card_photo_a?: string;
  /**
   * 身份证号背面
   */
  id_card_photo_b?: string;
  /**
   * 信息技术服务费
   */
  information_fee?: number;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 法人姓名
   */
  legal_person?: string;
  /**
   * 法人身份证号
   */
  legal_person_id_card?: string;
  /**
   * 经度
   */
  longitude?: string;
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
   * 订单有效期限
   */
  order_time?: string;
  /**
   * 归属人ID
   */
  owner_id?: string;
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
   * 收款信息银行卡号
   */
  payment_bank_card_no?: string;
  /**
   * 收款信息开户行
   */
  payment_bank_deposit_name?: string;
  /**
   * 付款时间
   */
  payment_time?: Date;
  /**
   * 产品服务id
   */
  product_configuration_service_id?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 省-编号
   */
  province_code?: string;
  /**
   * 收款信息二维码
   */
  qr_code_payment_information?: string;
  /**
   * 区域id
   */
  region_id?: string;
  /**
   * 区域名称
   */
  region_name?: string;
  /**
   * 是否为自营（1：是，0：否）
   */
  self_business?: boolean;
  /**
   * 经营类型：1：个人，2：个体工商，3：企业
   */
  self_support?: string;
  /**
   * 荣煤宝商家app二维码
   */
  seller_qr_code?: string;
  /**
   * 服务包费
   */
  service_fee?: number;
  /**
   * 入驻途径
   */
  settled_way?: string;
  /**
   * 经营地址
   */
  ship_address?: string;
  /**
   * 公司业务类型：1：个人，2：个体工商，3：企业
   */
  type?: number;
  /**
   * 修改时间
   */
  updated_time?: Date;
  [property: string]: any;
}

/**
 * 取消订单 商家入驻审核 请求参数
 */
export interface BuyerBusinessSettledCancelRequestParams {
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

/**
 * 收款确认 商家入驻审核 请求参数
 */
export interface BuyerBusinessSettledPayConfirmRequestParams {
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
