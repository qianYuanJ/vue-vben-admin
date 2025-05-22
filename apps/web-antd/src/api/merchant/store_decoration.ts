import type {
  RequestListParams,
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

export { getStoreDecorationList };
