import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard/dashboard.vue'
//authModule 
import Login from '../views/AuthModule/Login.vue'
import Leave from '../views/LeaveModule/leave.vue'
import AllLeave from '../views/LeaveModule/allLeave.vue';

//user module
import EmployeeList from '../views/UserModule/EmployeeList.vue'
import AddEmployee from '../views/UserModule/AddNewUser.vue'
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
  },
  {
    path: '/leave',
    name: 'leave',
    component:Leave,
   
  },
  {
    path:'/member',
    name :"EmployeeList",
    component:EmployeeList,
    meta: { requiresAuth: true }
  },
   
 
  {
    path:'/member/add',
    name :"AddNewEmployee",
    component:AddEmployee,
    meta: { requiresAuth: true }
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
