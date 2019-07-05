import Vue from 'vue';
import Router from 'vue-router';
const _import = file => () => import('@/views/' + file + '.vue')
import Full from '@/layout/Full'

/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [{
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/pages',
    redirect: '/pages/404',
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

export const asyncRouterMap = [{
    path: '/',
    component: Full,
    redirect: '/home',
    hidden: true,
    meta: {
      title: "首页"
    },
    children: [{
      path: '/home',
      name: 'home',
      icon: "el-icon-menu",
      component: _import('home/Home'),
      meta: {
        title: "首页"
      },
    }, {
      path: '/userInfo',
      name: 'userInfo',
      icon: 'el-icon-service',
      component: _import('userInfo/UserInfo'),
      meta: {
        title: "用户信息"
      },
    }]
  },
  {
    path: '*',
    redirect: '/pages/404',
    hidden: true
  }
];