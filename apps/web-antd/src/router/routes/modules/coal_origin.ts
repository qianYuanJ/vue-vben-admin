import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'coal_origin:index',
    path: '/coal_origin/index',
    component: () => import('#/views/coal_origin/list.vue'),
    meta: {
      icon: 'lucide:map-pin-house',
      order: 1,
      title: '原煤产地',
    },
  },
  {
    name: 'coal_origin:coal_overview',
    path: '/coal_origin/coal_overview',
    component: () => import('#/views/coal_origin/coal_overview/list.vue'),
    meta: {
      hideInMenu: true,
      hideInBreadcrumb: true,
      title: '煤质综述',
    },
  },
];

export default routes;
