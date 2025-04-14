import type { PlatformUser, Response } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<Response<PlatformUser>>(
    '/platform_user/get_platform_user__by_token',
  );
}
