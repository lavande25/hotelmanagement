import BasicLayout from '/@/layouts/BasicLayout/index.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/app',
    name: 'app',
    component: BasicLayout,
    redirect: '/app/hotel',
    meta: { title: '管理平台' },
    children: [
      // {
      //   path: '/app/home',
      //   component: () => import('/@/views/home/index.vue'),
      //   name: 'home',
      //   meta: {
      //     title: '首页',
      //     icon: 'liulanqi',
      //   },
      // },
      // {
      //   path: '/app/website',
      //   name: 'website',
      //   component: () => import('/@/views/website/index.vue'),
      //   meta: {
      //     title: '网站管理',
      //     keepAlive: true,
      //     icon: 'jiedianguanli',
      //   },
      // },
      // {
      //   path: '/app/table-demo',
      //   name: 'table-demo',
      //   component: () => import('/@/views/table-demo/index.vue'),
      //   meta: {
      //     title: '表格用法',
      //     keepAlive: true,
      //     icon: 'rili',
      //   },
      // },
      {
        path: '/app/hotel',
        name: 'hotel',
        component: () => import('/@/views/hotel/index.vue'),
        meta: {
          title: '酒店管理',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/membership',
        name: 'membership',
        component: () => import('/@/views/membership/index.vue'),
        meta: {
          title: '会员管理',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/permission',
        name: 'permission',
        component: () => import('/@/views/permission/index.vue'),
        meta: {
          title: '权限管理',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/invite',
        name: 'invite',
        component: () => import('/@/views/invite/index.vue'),
        meta: {
          title: '邀请记录',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/buyRecords',
        name: 'buyRecords',
        component: () => import('/@/views/buyRecords/index.vue'),
        meta: {
          title: '购买记录',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/user',
        name: 'user',
        component: () => import('/@/views/user/index.vue'),
        meta: {
          title: '用户管理',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/userRight',
        name: 'userRight',
        component: () => import('/@/views/userRight/index.vue'),
        meta: {
          title: '用户权益',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/feedback',
        name: 'feedback',
        component: () => import('/@/views/feedback/index.vue'),
        meta: {
          title: '反馈管理',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/config',
        name: 'config',
        component: () => import('/@/views/config/index.vue'),
        meta: {
          title: '配置管理',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/records',
        name: 'records',
        component: () => import('/@/views/records/index.vue'),
        meta: {
          title: '操作记录',
          keepAlive: true,
          icon: 'rili',
        },
      },
      {
        path: '/app/coupon',
        name: 'coupon',
        component: () => import('/@/views/coupon/index.vue'),
        meta: {
          title: '优惠卷',
          keepAlive: true,
          icon: 'rili',
        },
      },
      // {
      //   path: '/app/others',
      //   name: 'others',
      //   component: BlankLayout,
      //   redirect: '/app/others/about',
      //   meta: {
      //     title: '其他菜单',
      //     icon: 'shurumimadenglu',
      //   },
      //   children: [
      //     {
      //       path: '/app/others/about',
      //       name: 'about',
      //       component: () => import('/@/views/others/about/index.vue'),
      //       meta: { title: '关于', keepAlive: true, hiddenWrap: true },
      //     },
      //     {
      //       path: '/app/others/antdv',
      //       name: 'antdv',
      //       component: () => import('/@/views/others/antdv/index.vue'),
      //       meta: { title: '组件', keepAlive: true, breadcrumb: true },
      //     },
      //   ],
      // },

      {
        path: '/sys/account',
        name: 'account',
        component: () => import('/@/views/account/index.vue'),
        meta: { title: '用户管理', keepAlive: true },
      },
    ],
  },
];

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/app',
    meta: {
      title: 'Root',
    },
  },
  ...accessRoutes,
];

export const publicRoutes = [
  {
    path: '/redirect',
    component: BlankLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('/@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('/@/views/404.vue'),
  },
];

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [];

export default constantRoutes;
