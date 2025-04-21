import type { Response, RoleModel } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取角色信息
 */
async function getUserListByRoleId({
  roleId,
  page = 1,
  size = 10,
}: {
  page?: number;
  roleId: string;
  size?: number;
}) {
  return requestClient.post<Response<RoleModel>>(
    `/platform_user/get_user_list`,
    {
      roleId,
      page,
      size,
    },
  );
}

/**
 * 获取用户菜单树
 */
async function getUserMenuList(userId: string) {
  return requestClient.get<Response<RoleModel>>(
    `/platform_menu/user_tree?userId=${userId}`,
  );
}

export { getUserListByRoleId, getUserMenuList };
