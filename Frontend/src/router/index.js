import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard/dashboard.vue'
//authModule 
import Login from '../views/AuthModule/Login.vue'

Vue.use(VueRouter)

const isAuth = true
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path:'/auth/login',
    name:"Login",
    component:Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//router guard 
router.beforeEach((to, from , next)=>{
    console.log(to)
    if(to.meta.requiresAuth){
        if(isAuth){
           next()
        }
        else{
          next('/auth/login')
        }
    }
    else{
      next()
    }
})
export default router
