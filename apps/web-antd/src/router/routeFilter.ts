import type { RouteRecordRaw } from 'vue-router';

/**
 * 递归在本地静态路由中查找匹配某个 path 的路由项
 */
function findLocalRoute(
  path: string,
  localRoutes: RouteRecordRaw[],
): null | RouteRecordRaw {
  for (const route of localRoutes) {
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      const found = findLocalRoute(path, route.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

/**
 * 根据后端返回的 path 数组，筛选本地静态路由
 */
export function filterLocalRoutesByBackend(
  backendMenus: any[],
  localRoutes: RouteRecordRaw[],
): RouteRecordRaw[] {
  const filteredRoutes: RouteRecordRaw[] = [];

  backendMenus.forEach((item) => {
    const matched = findLocalRoute(item.path, localRoutes);
    if (matched) {
      const copy: RouteRecordRaw = { ...matched };
      if (item.children && item.children.length > 0 && matched.children) {
        copy.children = filterLocalRoutesByBackend(
          item.children,
          matched.children,
        );
      }
      filteredRoutes.push(copy);
    }
  });

  return filteredRoutes;
}

export function stringifyComponents(routes: any[]): any[] {
  return (
    routes
      .map((route) => {
        const newRoute: any = {
          ...route,
        };

        if (typeof route.component === 'function') {
          const str = route.component.toString();
          const fullPath = str.split('?')[0];
          newRoute.component = fullPath.split('/views')[1];
        }

        if (route.children && Array.isArray(route.children)) {
          newRoute.children = stringifyComponents(route.children);
          // 排序子菜单
          newRoute.children.sort((a: any, b: any) => {
            const orderA = a.meta?.order ?? 0;
            const orderB = b.meta?.order ?? 0;
            return orderA - orderB;
          });
        }

        return newRoute;
      })
      // 排序一级菜单
      .sort((a: any, b: any) => {
        const orderA = a.meta?.order ?? 0;
        const orderB = b.meta?.order ?? 0;
        return orderA - orderB;
      })
  );
}
