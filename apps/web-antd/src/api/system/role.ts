import type { Response, RoleModel } from '@vben/types';

import { requestClient } from '#/api/request';
/**
 * 获取角色列表
 */
async function getRoleList() {
  return requestClient.get<Response<RoleModel>>('/platform_role/all');
}

/**
 * 获取角色信息
 */
async function getRoleInfoById(id: string) {
  return requestClient.get<Response<RoleModel>>(`/platform_role/info?id=${id}`);
}

/**
 * 新增角色
 * @param data 角色数据
 * @param data.name 角色名称
 */
async function addRole(data: { name: string }) {
  return requestClient.post<Response<RoleModel>>(`/platform_role/add`, data);
}

/**
 * 修改角色信息
 * @param data 角色数据
 * @param data.id 角色ID
 * @param data.name 角色名称
 */
async function updateRole(data: { id: string; name: string }) {
  return requestClient.post<Response<RoleModel>>(`/platform_role/update`, data);
}

/**
 * 删除角色
 * @param data 角色数据
 * @param data.id 角色ID
 */
async function deleteRole(data: { id: string }) {
  return requestClient.post<Response<RoleModel>>(`/platform_role/delete`, data);
}

export { addRole, deleteRole, getRoleInfoById, getRoleList, updateRole };
