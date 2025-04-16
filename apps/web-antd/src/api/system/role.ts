import type { Response, RoleModel } from '@vben/types';

import { requestClient } from '#/api/request';
/**
 * 获取角色列表
 */
async function getRoleList() {
  return requestClient.get<Response<RoleModel>>('/platform_role/all');
}

export { getRoleList };
