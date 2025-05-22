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
