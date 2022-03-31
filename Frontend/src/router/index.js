import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard/dashboard.vue'
//authModule 
import Login from '../views/AuthModule/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path:'/auth/login',
    name:"Login",
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
