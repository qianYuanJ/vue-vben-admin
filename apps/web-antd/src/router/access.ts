import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@vben/types';

import { generateAccessible } from '@vben/access';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { getUserMenuList } from '#/api';
import { BasicLayout, IFrameView } from '#/layouts';

import { filterLocalRoutesByBackend, stringifyComponents } from './routeFilter';
import { accessRoutes } from './routes';

const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      message.loading({
        content: `加载菜单中...`,
        duration: 1.5,
      });
      const userStore = useUserStore();

      const res = await getUserMenuList(userStore?.userInfo?.id ?? '');
      const filteredRoutes = filterLocalRoutesByBackend(
        Array.isArray(res.data) ? res.data : [],
        accessRoutes,
      );

      return new Promise((resolve) =>
        resolve(stringifyComponents(filteredRoutes)),
      );
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };
