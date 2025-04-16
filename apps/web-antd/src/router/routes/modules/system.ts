import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      order: 9999,
      title: $t('page.system.title'),
    },
    name: 'SystemSettings',
    path: '/system',
    children: [
      {
        name: 'DeptManagement',
        path: '/system/dept',
        component: () => import('#/views/system/dept/list.vue'),
        meta: {
          icon: 'lucide:users',
          title: $t('page.system.department'),
        },
      },
      {
        name: 'EmployeeManagement',
        path: '/system/dept/employee',
        component: () => import('#/views/system/dept/employee/list.vue'),
        meta: {
          hideInMenu: true,
          title: $t('page.system.employee'),
        },
      },
      {
        name: 'OperationLog',
        path: '/system/operation-log',
        component: () => import('#/views/system/operation-log/list.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: $t('page.system.operationLog'),
        },
      },
      {
        name: 'RolePermission',
        path: '/system/role',
        component: () => import('#/views/system/role/list.vue'),
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
