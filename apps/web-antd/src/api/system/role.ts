import type { Response, RoleModel } from '@vben/types';

import { requestClient } from '#/api/request';
/**
 * 获取员工角色列表
 */
async function getEmployeeRoleList() {
  return requestClient.get<Response<RoleModel>>('/platform_role/all');
}

export { getEmployeeRoleList };
