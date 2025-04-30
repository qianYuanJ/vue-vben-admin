/**
 * 商家商品详情管理
 */
export interface MerchantProductDetails {
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 商品ID
   */
  goods_id?: string;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 图片地址
   */
  picture_address?: string;
  /**
   * 商家店铺ID
   */
  seller_id?: string;
  /**
   * 图片类型
   */
  type?: string;
  /**
   * 修改时间
   */
  update_time?: Date;
  [property: string]: any;
}

/**
 * 已审核通过的店铺素材
 */
export interface SellerCompanyManage {
  /**
   * 其他保障
   */
  assurance_other?: string;
  /**
   * 审核不通过原因
   */
  audit_reason?: string;
  /**
   * 联系人电话
   */
  contacts_phone?: string;
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 逻辑删除
   */
  del?: number;
  /**
   * 审核状态 1:待审核 2: 已通过 3：待商家修改
   */
  examine_status?: string;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 审核人姓名
   */
  operator_name?: string;
  /**
   * 审核人id
   */
  operator_user_id?: string;
  /**
   * 宣传视频
   */
  promotion_video?: string;
  /**
   * 宣传图片
   */
  promotional_images?: string;
  /**
   * 品质保障
   */
  quality_assurance?: string;
  /**
   * 经营类型  1：个人，2：个体工商，3：企业
   */
  self_support?: string;
  /**
   * 商家关联id
   */
  seller_company_id?: string;
  /**
   * 店铺图标
   */
  seller_icon?: string;
  /**
   * 标签
   */
  seller_label?: string;
  /**
   * 商家名称
   */
  seller_name?: string;
  /**
   * 店铺简介
   */
  shop_introduction?: string;
  /**
   * 公司业务类型：1：个人，2：个体工商，3：企业
   */
  type?: number;
  /**
   * 修改时间
   */
  updated_time?: Date;
  /**
   * 视频封面
   */
  video_cover?: string;
  [property: string]: any;
}

/**
 * ShopInfo
 */
export interface ShopInfo {
  /**
   * 地址详情
   */
  address?: string;
  /**
   * 审批时间
   */
  auth_time?: Date;
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
   * 创建时间
   */
  create_time?: Date;
  /**
   * 正常:0;禁用:1
   */
  disable_status?: number;
  /**
   * 区
   */
  district?: string;
  /**
   * 区-编码
   */
  district_code?: string;
  /**
   * 审核结果
   */
  examine_result?: string;
  /**
   * 完成时间
   */
  finish_time?: Date;
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
   * logo
   */
  logo?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 企业名称
   */
  name?: string;
  /**
   * 归属人ID
   */
  owner_id?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 省-编号
   */
  province_code?: string;
  /**
   * 拒绝原因
   */
  refuse_reason?: string;
  /**
   * 备注
   */
  remarks?: string;
  /**
   * 是否为自营（1：是，0：否）
   */
  self_business?: boolean;
  /**
   * 经营类型
   */
  self_support?: string;
  sellerCompanyManage?: SellerCompanyManage;
  /**
   * 服务包费
   */
  service_fee?: number;
  /**
   * 企业简称
   */
  shorter_form?: string;
  /**
   * 0:待审批;1:已审批
   */
  status?: number;
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
 * 商家商品管理
 */
export interface MerchantProduct {
  /**
   * 商家加价
   */
  add_price?: number;
  /**
   * 地址详情
   */
  address?: string;
  /**
   * 灰分
   */
  ash_value?: number;
  /**
   * 标准化块型
   */
  block_type?: string;
  /**
   * 粘结指数
   */
  bond_value?: number;
  /**
   * 试烧视频
   */
  burn_video?: string;
  /**
   * 试烧视频封面
   */
  burn_video_cover_url?: string;
  /**
   * 热值范围
   */
  calorific_range?: string;
  /**
   * 热值
   */
  calorific_value?: number;
  /**
   * 热值范围
   */
  calorificRange?: string;
  /**
   * 城市
   */
  city?: string;
  /**
   * 城市-编号
   */
  city_code?: string;
  /**
   * 煤质等级
   */
  coal_grade?: string;
  /**
   * 煤种
   */
  coal_type?: string;
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 区
   */
  district?: string;
  /**
   * 区-编码
   */
  district_code?: string;
  /**
   * 探矿视频
   */
  explore_video?: string;
  /**
   * 探矿视频封面
   */
  explore_video_cover_url?: string;
  /**
   * 价格涨跌
   */
  gains?: number;
  /**
   * 矸石种类
   */
  gangue_type?: string;
  goods_detail?: { [key: string]: MerchantProductDetails[] };
  /**
   * 商品名称
   */
  goods_name?: string;
  /**
   * 商品价格/展示价格（最终价格）
   */
  goods_price?: number;
  /**
   * 商品用途
   */
  goods_purpose?: string;
  /**
   * 商品商城展示名称：煤产地+标准化块型+煤种+煤质等级+商品名称
   */
  goods_show_name?: string;
  /**
   * 上架状态（true/false）
   */
  goods_state?: boolean;
  /**
   * 商品类型(自营商家/第三方商家)
   */
  goods_type?: string;
  /**
   * 质量级别
   */
  grade?: string;
  /**
   * 高位热值
   */
  higher_calorific_value?: number;
  highlightFields?: string;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 库存
   */
  inventory?: number;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 装车费
   */
  load_fee?: number;
  /**
   * 装车方式
   */
  load_type?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 低位热值
   */
  lower_calorific_value?: number;
  /**
   * 煤矿煤厂汇总表ID（商品类型为第三方商家时为null）
   */
  mine_factory_id?: string;
  /**
   * 煤矿煤厂汇总名称（商品类型为第三方商家时为null）
   */
  mine_factory_name?: string;
  /**
   * 生产洗选厂家展示名称
   */
  mine_factory_show_name?: string;
  mining_area?: string;
  /**
   * 全水分
   */
  moisture_value?: number;
  name: string;
  /**
   * 是否让捡石头
   */
  pick_up_rocks?: boolean;
  /**
   * 化验单图片
   */
  picture_inspect_url?: string;
  /**
   * 产品图片
   */
  picture_product_urls?: string;
  price_update_time?: Date;
  /**
   * 生产状态
   */
  produce_status?: string;
  /**
   * 检修、倒采面、暂时停产时间
   */
  produce_status_time?: string;
  /**
   * 生产方式
   */
  produce_type?: string;
  /**
   * 煤产地ID
   */
  producer_id?: string;
  /**
   * 煤产地名称
   */
  producer_name?: string;
  /**
   * 产品ID（商品类型为第三方商家时为null）
   */
  product_id?: string;
  /**
   * 出厂品名（商品类型为第三方商家时为null）
   */
  product_name?: string;
  /**
   * 产品价格/商品价格（上货价）
   */
  product_price?: number;
  /**
   * 产品类型（块煤、籽煤、原粉煤）
   */
  product_type?: string;
  prompt?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 省-编号
   */
  province_code?: string;
  /**
   * 是否推荐热销好煤（true/false）
   */
  recommend?: boolean;
  /**
   * 供应商让价
   */
  reduce_price?: number;
  /**
   * 捡石头费
   */
  rocks_fee?: number;
  /**
   * 销售状态
   */
  sale_state?: string;
  /**
   * 销量(/吨)
   */
  sales_count?: number;
  /**
   * 商家店铺标签
   */
  seller_company_label?: string;
  /**
   * 自营商家商品标签
   */
  seller_goods_label?: string;
  /**
   * 商家店铺ID
   */
  seller_id?: string;
  /**
   * 店铺名称
   */
  seller_name?: string;
  sellerCompany?: ShopInfo;
  /**
   * 服务费
   */
  service_fee?: number;
  /**
   * 结算方式（一票/两票）
   */
  settlement_mode?: string;
  /**
   * 硫分
   */
  sulfur_value?: number;
  /**
   * 煤质综述内容
   */
  summarize_content?: string;
  /**
   * 供应商ID（商品类型为第三方商家时为null）
   */
  supplier_id?: string;
  /**
   * 供应商名称
   */
  supplier_name?: string;
  /**
   * 总权重值
   */
  total_weight?: number;
  /**
   * 价格更新时间
   */
  update_time?: Date;
  /**
   * 真人视频封面
   */
  video_cover_url?: string;
  /**
   * 真人视频
   */
  video_url?: string;
  /**
   * 浏览量
   */
  views_count?: number;
  /**
   * 挥发分
   */
  volatilize_value?: number;
  /**
   * 权重值
   */
  weight?: number;
  [property: string]: any;
}

/**
 * PlatformCoalLocality
 */
export interface PlatformCoalLocality {
  /**
   * 地址详情
   */
  address?: string;
  /**
   * 所属企业
   */
  affiliation_company?: string;
  /**
   * 热值范围
   */
  calorific_range?: string;
  /**
   * 城市
   */
  city?: string;
  /**
   * 城市-编码
   */
  city_code?: string;
  /**
   * 企业性质
   */
  company_nature?: string;
  /**
   * 联系人
   */
  contact?: string;
  /**
   * 联系人电话
   */
  contact_phone?: string;
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 创建人ID
   */
  create_user_id?: string;
  /**
   * 创建人名称
   */
  create_user_name?: string;
  /**
   * 设计产能
   */
  design_capacity?: number;
  /**
   * 区
   */
  district?: string;
  /**
   * 区-编码
   */
  district_code?: string;
  /**
   * 预计挖完时间
   */
  expected_over_time?: string;
  /**
   * 开采方式
   */
  exploit_method?: string;
  goodsList?: MerchantProduct[];
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 是否完成智能化建设
   */
  intelligent?: number;
  /**
   * 纬度
   */
  latitude?: string;
  /**
   * 经度
   */
  longitude?: string;
  /**
   * 主要经营
   */
  main_operate?: string;
  /**
   * 煤矿煤厂汇总表ID
   */
  mine_factory_id?: string;
  /**
   * 所在矿区
   */
  mining_area?: string;
  /**
   * 煤矿名称
   */
  name?: string;
  /**
   * 图片地址
   */
  picture_urls?: string;
  /**
   * 生产状态
   */
  produce_status?: string;
  /**
   * 绿色矿山等级
   */
  producer_grade?: string;
  /**
   * 省
   */
  province?: string;
  /**
   * 省-编号
   */
  province_code?: string;
  /**
   * 备注
   */
  remarks?: string;
  /**
   * 煤矿简称
   */
  short_name?: string;
  /**
   * 自定义排序
   */
  sort?: number;
  /**
   * 煤质综述
   */
  summarize?: string;
  /**
   * 简介
   */
  summary?: string;
  /**
   * 视频地址
   */
  video_url?: string;
  /**
   * 年产能
   */
  year_capacity?: number;
  [property: string]: any;
}

// 煤质综述类型：
/**
 * 煤质综述请求参数类型
 */
export interface PlatformSummarizeParams {
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 煤矿煤厂汇总表ID
   */
  mine_factory_id: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 操作人id
   */
  operator_id?: string;
  /**
   * 煤质综述内容
   */
  summarize_content?: string;
  /**
   * 标签类型（原煤/粉煤/块煤/混块/原煤/洗面）
   */
  type: string;
  [property: string]: any;
}

/**
 * 煤质综述 响应数据类型
 */
export interface PlatformSummarize {
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 煤矿煤厂汇总表ID
   */
  mine_factory_id: string;
  /**
   * 煤质综述内容
   */
  summarize_content: string;
  /**
   * 标签类型（原煤/粉煤/块煤/混块/原煤/洗面）
   */
  type: string;
  [property: string]: any;
}
