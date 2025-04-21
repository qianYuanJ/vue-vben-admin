import type { PlatformUser, Recordable, Response } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { getUserInfoApi, loginApi } from '#/api';

export const useLoginStore = defineStore('login', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function login(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | PlatformUser = null;
    try {
      loginLoading.value = true;
      const { data } = await loginApi(params);
      // 如果成功获取到 accessToken
      if (data.token) {
        accessStore.setAccessToken(data.token);

        userInfo = data;

        userStore.setUserInfo(userInfo);
        accessStore.setAccessCodes([data.id]);

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(DEFAULT_HOME_PATH);
        }

        if (userInfo?.realName) {
          notification.success({
            description: `欢迎回来:${userInfo?.realName}`,
            duration: 3,
            message: '登录成功',
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    let userInfoRes: null | Response<PlatformUser> = null;
    userInfoRes = await getUserInfoApi();

    userStore.setUserInfo(userInfoRes.data ?? null);
    return userInfoRes.data ?? null;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    login,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
