import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Create = () => import('@/views/Create')
const Detail = () => import('@/views/Detail')
const My = () => import('@/views/My')
const Edit = () => import('@/views/Edit')
const User = () => import('@/views/User')

const routes = [
  {
    path: '/',
    // component: Home
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/create',
    component: Create,
    meta: {requiresAuth: true}
  },
  {
    path: '/detail/:blogId',
    component: Detail
  },
  {
    path: '/edit/:blogId',
    component: Edit,
    meta: {requiresAuth: true}
  },
  {
    path: '/my',
    component: My,
    meta: {requiresAuth: true}
  },
  {
    path: '/user/:userId',
    component: User
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(1);
    store.dispatch('checkLogin')
      .then(isLogin => {
        console.log(2);
        // 需要验证的路由
        if (isLogin) {
          next()
        }
      })
      .catch(() => {
        console.log(3);
        // 是否登录
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      })
  } else {
    console.log(4);
    next() // 确保一定要调用 next()
  }
})

export default router
