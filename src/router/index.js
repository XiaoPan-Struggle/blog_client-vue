import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Create from '@/views/Create.vue'
import Detail from '@/views/Detail.vue'
import Edit from '@/views/Edit.vue'
import My from '@/views/My.vue'
import Register from '@/views/Register.vue'
import User from '@/views/User.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/create',
    component: Create
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  routes
})

export default router
