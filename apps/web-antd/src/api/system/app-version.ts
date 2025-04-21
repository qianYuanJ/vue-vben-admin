import type { Response } from '@vben/types';

import { requestClient } from '#/api/request';

// 应用版本数据模型
export interface AppVersionModel {
  id?: string;
  edition_number?: number;
  application_name?: string;
  edition_name: string; // 版本号
  edition_url: string; // 下载链接
  edition_type: string; // 应用标识
  describe: string; // 版本描述
  version_type: string; // android/ios
  edition_force: boolean; // 是否强制更新
  edition_issue: boolean; // 是否已发布
  package_type: string; // 包类型：0-安装包，1-资源包
  edition_silence: boolean; // 是否静默更新
  create_time?: number;
}

// API路径常量
const API_ENDPOINTS = {
  default: '/edition',
  logistics: 'http://api.rmb.test.rongmeibao.com:8111/logistics_portal/edition',
};

/**
 * 创建应用版本
 * @param params 版本信息
 * @param isLogistics 是否为物流应用
 */
export function createAppVersion(params: AppVersionModel, isLogistics = false) {
  const baseUrl = isLogistics ? API_ENDPOINTS.logistics : API_ENDPOINTS.default;
  return requestClient.post<Response<AppVersionModel>>(
    `${baseUrl}/add_edition`,
    params,
  );
}

/**
 * 更新应用版本
 * @param params 版本信息
 * @param isLogistics 是否为物流应用
 */
export function updateAppVersion(params: AppVersionModel, isLogistics = false) {
  const baseUrl = isLogistics ? API_ENDPOINTS.logistics : API_ENDPOINTS.default;
  return requestClient.post<Response<AppVersionModel>>(
    `${baseUrl}/update_edition`,
    params,
  );
}

/**
 * 删除应用版本
 * @param id 版本ID
 * @param isLogistics 是否为物流应用
 */
export function deleteAppVersion(id: string, isLogistics = false) {
  const baseUrl = isLogistics ? API_ENDPOINTS.logistics : API_ENDPOINTS.default;
  return requestClient.get<Response<any>>(
    `${baseUrl}/delete_edition_one_data?id=${id}`,
  );
}

/**
 * 根据ID获取应用版本详情
 * @param id 版本ID
 * @param isLogistics 是否为物流应用
 */
export function getAppVersionById(id: string, isLogistics = false) {
  const baseUrl = isLogistics ? API_ENDPOINTS.logistics : API_ENDPOINTS.default;
  return requestClient.post<Response<AppVersionModel>>(
    `${baseUrl}/get_edition_by_id`,
    { id },
  );
}
