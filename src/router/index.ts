import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

Vue.use(Router)

export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  // {
  //   path: '/device',
  //   component: Layout,
  //   redirect: '/device/index',
  //   meta: {
  //     title: 'device',
  //     icon: 'devices',
  //     // roles: ['admin', 'editor'], // you can set roles in root nav
  //     alwaysShow: true // will always show the root menu
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "guide" */ '@/views/device/index.vue'),
  //       name: 'Device',
  //       meta: {
  //         title: 'device_list',
  //         // icon: 'devices',
  //         noCache: false
  //       }
  //     },
  //     {
  //       path: 'device-versions',
  //       component: () => import(/* webpackChunkName: "guide" */ '@/views/deviceVersion/index.vue'),
  //       name: 'DeviceVersion',
  //       meta: {
  //         title: 'device_version',
  //         // icon: 'devices',
  //         noCache: false
  //       }
  //     },
  //     {
  //       path: 'device-logs/:id',
  //       component: () => import(/* webpackChunkName: "guide" */ '@/views/logs/index.vue'),
  //       name: 'DeviceLogs',
  //       meta: {
  //         title: 'padLog',
  //         // icon: 'devices',
  //         noCache: true,
  //         hidden: true
  //       }
  //     },
  //     {
  //       path: 'gate-device-logs/:deviceId',
  //       component: () => import(/* webpackChunkName: "guide" */ '@/views/logs/gateLog.vue'),
  //       name: 'GateDeviceLogs',
  //       meta: {
  //         title: 'gateLog',
  //         // icon: 'devices',
  //         noCache: true,
  //         hidden: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "icons" */ '@/views/user/index.vue'),
        name: 'UserManger',
        meta: {
          title: 'user',
          icon: 'user',
          noCache: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
