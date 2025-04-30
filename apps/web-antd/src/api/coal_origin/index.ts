import type {
  PlatformCoalLocality,
  RequestListParams,
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
  return requestClient.post<Response>(
    '/platform_coal_locality/update_coal_locality',
    data,
  );
}

export { getCoalOriginList, updateCoalOrigin };
