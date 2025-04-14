import { requestClient } from '#/api/request';

export namespace LoginApi {
  /** 获取验证码接口参数 */
  export interface GetVerifyCodeApiParams {
    mobile: string;
  }

  /** 登录接口参数 */
  export interface LoginApiParams {
    phone?: string;
    code?: string;
  }
}

/** 获取验证码 */
export async function getVerifyCodeApi(data: LoginApi.GetVerifyCodeApiParams) {
  return requestClient.get(
    `/platform_user/get_verification_code?mobile=${data.mobile}`,
  );
}

/** 登录 */
export async function loginApi(data: LoginApi.LoginApiParams) {
  return requestClient.post('/platform_user/get_platform_user_login', data);
}
