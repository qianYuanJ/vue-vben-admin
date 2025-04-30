import { requestClient } from '#/api/request';

/** 获取oss-token */
export async function getOssTokenApi() {
  return requestClient.get(`/storage/get_sts_token`);
}
