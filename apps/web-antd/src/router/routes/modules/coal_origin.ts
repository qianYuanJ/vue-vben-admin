import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'coal_origin:index',
    path: '/coal_origin/index',
    component: () => import('#/views/coal_origin/list.vue'),
    meta: {
      icon: 'lucide:map-pin-house',
      title: '原煤产地',
    },
  },
];

export default routes;
