import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'evaluation',
    path: '/evaluation',
    meta: {
      icon: 'lucide:message-square-text',
      title: '评价系统',
    },
    children: [
      {
        name: 'evaluation:supplier_evaluation',
        path: '/evaluation/supplier_evaluation',
        component: () => import('#/views/coal_origin/coal_overview/list.vue'),
        meta: {
          title: '供应商评价',
        },
      },
      {
        name: 'evaluation:customer_evaluation',
        path: '/evaluation/customer_evaluation',
        component: () => import('#/views/coal_origin/coal_overview/list.vue'),
        meta: {
          title: '客户评价',
        },
      },
      {
        name: 'evaluation:logistics_evaluation',
        path: '/evaluation/logistics_evaluation',
        component: () => import('#/views/coal_origin/coal_overview/list.vue'),
        meta: {
          title: '物流运力评价',
        },
      },
    ],
  },
];

export default routes;
