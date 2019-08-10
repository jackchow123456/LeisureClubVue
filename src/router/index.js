import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Reset from '../components/Reset'
import QiNiu from '../components/QiNiu'
import Vote from '../components/Vote'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/reset', component: Reset },
  { path: '/qiniu', component: QiNiu, meta: { requireAuth: true } },
  { path: '/vote', component: Vote, meta: { requireAuth: true } }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let whiteList = ['/login', '/home'];
  if (whiteList.indexOf(to.path)) {
    next()
  }
  if (to.meta.requireAuth == true) {
    if (sessionStorage.getItem('authToken')) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router
