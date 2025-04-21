import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      order: 9999,
      title: '系统设置',
    },
    name: 'system_setting',
    path: '/system_setting',
    children: [
      {
        name: 'system_setting:dept_management',
        path: '/system_setting/staff_management',
        component: () =>
          import('#/views/system_setting/staff_management/list.vue'),
        meta: {
          icon: 'lucide:users',
          title: '部门管理',
          order: 1,
        },
      },
      {
        name: 'system_setting:staff_management:employee',
        path: '/system_setting/staff_management/employee',
        component: () =>
          import('#/views/system_setting/staff_management/employee/list.vue'),
        meta: {
          hideInMenu: true,
          title: '员工管理',
        },
      },
      {
        name: 'system_setting:operation_log',
        path: '/system_setting/operation_log',
        component: () =>
          import('#/views/system_setting/operation_log/list.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: '操作日志',
          order: 2,
        },
      },
      {
        name: 'system_setting:rbac',
        path: '/system_setting/rbac',
        component: () => import('#/views/system_setting/rbac/list.vue'),
        meta: {
          icon: 'lucide:shield',
          title: '角色权限管理',
          order: 3,
        },
      },
      {
        name: 'system_setting:version',
        path: '/system_setting/version',
        component: () => import('#/views/system_setting/version/index.vue'),
        meta: {
          icon: 'lucide:smartphone',
          title: 'APP版本管理',
          order: 4,
        },
      },
    ],
  },
];

export default routes;
