import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      order: 100,
      title: $t('page.system.title'),
    },
    name: 'SystemSettings',
    path: '/system',
    children: [
      {
        name: 'DepartmentManagement',
        path: '/system/department',
        component: () => import('#/views/system/department/index.vue'),
        meta: {
          icon: 'lucide:users',
          title: $t('page.system.department'),
        },
      },
      {
        name: 'OperationLog',
        path: '/system/operation-log',
        component: () => import('#/views/system/operation-log/index.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: $t('page.system.operationLog'),
        },
      },
      {
        name: 'RolePermission',
        path: '/system/role',
        component: () => import('#/views/system/role/index.vue'),
        meta: {
          icon: 'lucide:shield',
          title: $t('page.system.rolePermission'),
        },
      },
      {
        name: 'AppVersionManagement',
        path: '/system/app-version',
        component: () => import('#/views/system/app-version/index.vue'),
        meta: {
          icon: 'lucide:smartphone',
          title: $t('page.system.appVersion'),
        },
      },
    ],
  },
];

export default routes;
