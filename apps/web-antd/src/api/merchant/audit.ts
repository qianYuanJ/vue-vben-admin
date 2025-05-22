import type {
  BuyerBusinessSettledCancelRequestParams,
  BuyerBusinessSettledPayConfirmRequestParams,
  ImBuyerBusinessSettled,
  RequestListParams,
  Response,
  ResponseList,
} from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取 商家入驻审核 列表数据
 * @param data 分页参数
 */
async function getAuditList(data: RequestListParams) {
  return requestClient.post<ResponseList<ImBuyerBusinessSettled[]>>(
    '/buyer_business_settled/select_buyer_business_settled_order_page',
    data,
  );
}

/**
 * 取消订单 商家入驻审核
 * @param data 请求参数
 */
async function cancelOrderApi(data: BuyerBusinessSettledCancelRequestParams) {
  return requestClient.post<Response<null>>(
    '/buyer_business_settled/buyer_business_settled_cancle',
    data,
  );
}

/**
 * 收款确认 商家入驻审核
 * @param data 请求参数
 */
async function payConfirmApi(
  data: BuyerBusinessSettledPayConfirmRequestParams,
) {
  return requestClient.post<Response<null>>(
    '/buyer_business_settled/buyer_business_settled_confirm',
    data,
  );
}
/**
 * 通过审核 商家入驻审核
 * @param data 请求参数
 */
async function auditPassApi(data: BuyerBusinessSettledPayConfirmRequestParams) {
  return requestClient.post<Response<null>>(
    '/buyer_business_settled/buyer_business_settled_audit',
    data,
  );
}

/**
 * 拒绝通过 商家入驻审核
 * @param data 请求参数
 */
async function auditRejectApi(
  data: BuyerBusinessSettledPayConfirmRequestParams,
) {
  return requestClient.post<Response<null>>(
    '/buyer_business_settled/buyer_business_settled_audit',
    data,
  );
}

export {
  auditPassApi,
  auditRejectApi,
  cancelOrderApi,
  getAuditList,
  payConfirmApi,
};
