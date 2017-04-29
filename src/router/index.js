import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import about from '@/components/about'
import dashboard from '@/components/dashboard'
import Interface from '@/components/interface'
import devices from '@/components/devices'
import top10rank from '@/components/top10rank'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/interface',
      name: 'interface',
      component: Interface
    },
    {
      path: '/devices',
      name: 'devices',
      component: devices
    },
    {
      path: '/top10rank',
      name: 'top10rank',
      component: top10rank
    }
  ]
})
