import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'merchant_management',
    path: '/merchant_management',
    meta: {
      icon: 'lucide:store',
      title: '商家入驻管理',
      order: 2,
    },
    children: [
      {
        name: 'merchant_management:audit',
        path: '/merchant_management/audit',
        component: () => import('#/views/merchant_management/audit/list.vue'),
        meta: {
          title: '商家入驻审核',
        },
      },
      {
        name: 'merchant_management:store_decoration',
        path: '/merchant_management/management',
        component: () =>
          import('#/views/merchant_management/store_decoration/list.vue'),
        meta: {
          title: '商家店铺装修',
        },
      },
      {
        name: 'merchant_management:business',
        path: '/merchant_management/business',
        component: () =>
          import('#/views/merchant_management/business/list.vue'),
        meta: {
          title: '商家管理',
        },
      },

      {
        name: 'merchant_management:config',
        path: '/merchant_management/config',
        component: () => import('#/views/merchant_management/config/list.vue'),
        meta: {
          title: '产品服务配置',
        },
      },

      {
        name: 'merchant_management:banner',
        path: '/merchant_management/banner',
        component: () => import('#/views/merchant_management/banner/list.vue'),
        meta: {
          title: '商家权益Banner配置',
        },
      },
    ],
  },
];

export default routes;
