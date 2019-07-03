import Vue from 'vue';
import Router from 'vue-router';
const _import = file => () => import('@/views/' + file + '.vue')
import Full from '@/layout/Full'

/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    component: Full,
    hidden: true
  },{
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/pages',
    redirect: '/pages/p404',
    name: 'Pages',
    component: {
      render(c) {
        return c('router-view')
      }
      // Full, 全屏
    },
    children: [{
        path: '404',
        name: 'Page404',
        component: _import('errorPages/Page404')
      },
      {
        path: '500',
        name: 'Page500',
        component: _import('errorPages/Page404')
      },
    ]
  }
]

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/dashboard',
    name: '首页',
    component: Full,
    hidden: false,
    children: [{
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'speedometer',
        component: _import('Dashboard')
      },
      {
        path: '/introduction',
        name: '介绍',
        icon: 'thumbsup',
        meta: { role: ['admin'] },
        component: _import('Introduction')
      },
    ]
  },
  {
    path: '*',
    redirect: '/pages/404',
    hidden: true
  }
];