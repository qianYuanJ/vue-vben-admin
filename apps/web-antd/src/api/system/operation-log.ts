import type { OperateLog, RequestListParams, ResponseList } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取操作日志列表数据
 * @param data 分页参数
 */
async function getOperationLogList(data: RequestListParams) {
  return requestClient.post<ResponseList<OperateLog[]>>(
    '/platform_user/get_operate_log_page',
    data,
  );
}
export { getOperationLogList };
