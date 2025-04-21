import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      order: 9999,
      title: '系统设置',
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
          title: '部门管理',
        },
      },
      {
        name: 'EmployeeManagement',
        path: '/system/dept/employee',
        component: () => import('#/views/system/dept/employee/list.vue'),
        meta: {
          hideInMenu: true,
          title: '员工管理',
        },
      },
      {
        name: 'OperationLog',
        path: '/system/operation-log',
        component: () => import('#/views/system/operation-log/list.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: '操作日志',
        },
      },
      {
        name: 'RolePermission',
        path: '/system/role',
        component: () => import('#/views/system/role/list.vue'),
        meta: {
          icon: 'lucide:shield',
          title: '角色权限管理',
        },
      },
      {
        name: 'AppVersionManagement',
        path: '/system/app-version',
        component: () => import('#/views/system/app-version/index.vue'),
        meta: {
          icon: 'lucide:smartphone',
          title: 'APP版本管理',
        },
      },
    ],
  },
];

export default routes;
