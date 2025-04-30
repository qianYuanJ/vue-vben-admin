import type {
  PlatformCoalLocality,
  PlatformSummarize,
  PlatformSummarizeParams,
  RequestListParams,
  Response,
  ResponseList,
} from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取原煤产地列表数据
 * @param data 分页参数
 */
async function getCoalOriginList(data: RequestListParams) {
  return requestClient.post<ResponseList<PlatformCoalLocality[]>>(
    '/platform_coal_locality/get_platform_coal_locality_page',
    data,
  );
}

/**
 * 修改原煤产地
 * @param data 原煤产地数据
 */
async function updateCoalOrigin(data: PlatformCoalLocality) {
  return requestClient.post<Response<null>>(
    '/platform_coal_locality/update_coal_locality',
    data,
  );
}

export { getCoalOriginList, updateCoalOrigin };

/**
 * 获取煤质综述
 * @param data
 * @param data.mine_factory_id 原煤产地ID
 * @param data.type 煤矿类型
 */
async function getCoalOverview(data: PlatformSummarizeParams) {
  return requestClient.post<Response<PlatformSummarize>>(
    '/platform_coal_summarize/get_summarize_list',
    data,
  );
}

/**
 * 新增煤质综述
 * @param data
 * @param data.mine_factory_id 原煤产地ID
 * @param data.summarize_content 煤质综述内容
 * @param data.type 煤矿类型
 */
async function createCoalOverview(data: PlatformSummarizeParams) {
  return requestClient.post<Response<PlatformSummarize>>(
    '/platform_coal_summarize/add_summarize',
    data,
  );
}
export { createCoalOverview, getCoalOverview };
