import type { IUserInfo, Recordable } from '@vben/types';

import { ref } from 'vue';

import { DEFAULT_HOME_PATH } from '@vben/constants';

import { defineStore } from 'pinia';

import { loginApi } from '#/api/login';
import { router } from '#/router';

export const useLoginStore = defineStore('login', () => {
  const loginLoading = ref(false);

  const login = async (
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) => {
    // 异步处理用户登录操作并获取 accessToken
    const userInfo: IUserInfo | null = null;
    try {
      loginLoading.value = true;
      const res = await loginApi(params);
      res;
      // console.log('🚀 ~ useLoginStore ~ res:', res);
      onSuccess ? await onSuccess?.() : await router.push(DEFAULT_HOME_PATH);
      // 如果成功获取到 accessToken
      // if (accessToken) {
      //   accessStore.setAccessToken(accessToken);

      //   // 获取用户信息并存储到 accessStore 中
      //   const [fetchUserInfoResult, accessCodes] = await Promise.all([
      //     fetchUserInfo(),
      //     getAccessCodesApi(),
      //   ]);

      //   userInfo = fetchUserInfoResult;

      //   userStore.setUserInfo(userInfo);
      //   accessStore.setAccessCodes(accessCodes);

      //   if (accessStore.loginExpired) {
      //     accessStore.setLoginExpired(false);
      //   } else {
      //     onSuccess
      //       ? await onSuccess?.()
      //       : await router.push(userInfo.homePath || DEFAULT_HOME_PATH);
      //   }

      //   if (userInfo?.realName) {
      //     notification.success({
      //       description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
      //       duration: 3,
      //       message: $t('authentication.loginSuccess'),
      //     });
      //   }
      // }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  };

  return {
    loginLoading,
    login,
  };
});
