import type {
  RequestListParams,
  Response,
  ResponseList,
  SellerCompanyManage,
} from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取 商家店铺装修 列表数据
 * @param data 分页参数
 */
async function getStoreDecorationList(data: RequestListParams) {
  return requestClient.post<ResponseList<SellerCompanyManage[]>>(
    '/seller_company_manage/select_seller_company_manage_page',
    data,
  );
}

/**
 *  商家店铺装修 审核通过
 * @param data
 */
async function auditPassApi(data: SellerCompanyManage) {
  return requestClient.post<Response<null>>(
    '/seller_company_manage/seller_company_manage_audit',
    data,
  );
}
/**
 *  商家店铺装修 审核拒绝
 * @param data
 */
async function auditRejectApi(data: SellerCompanyManage) {
  return requestClient.post<Response<null>>(
    '/seller_company_manage/seller_company_manage_audit',
    data,
  );
}

/**
 *  商家店铺装修 标签修改
 * @param data
 */
async function updateTag(data: { id: string; seller_label: string }) {
  return requestClient.post<Response<null>>(
    '/seller_company_manage/update_seller_company_manage_label',
    data,
  );
}

export { auditPassApi, auditRejectApi, getStoreDecorationList, updateTag };
