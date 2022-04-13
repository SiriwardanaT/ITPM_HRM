import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard/dashboard.vue'
//authModule 
import Login from '../views/AuthModule/Login.vue'
import AuthService from '../services/authServices'
import AuthHelpers from '../services/authHelpers'
import AuthorizedView from '../views/AuthModule/AuthorizedView.vue'
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
    meta: { requiresAuth: true ,requiresAdmin :false}
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
    meta: { requiresAuth: true ,requiresAdmin :false}
  },
   
 
  {
    path:'/member/add',
    name :"AddNewEmployee",
    component:AddEmployee,
    meta: { requiresAuth: true ,requiresAdmin :true}
  },
  {
    path:'/error/401',
    component:AuthorizedView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//router guard 
router.beforeEach((to, from , next)=>{
    if(to.meta.requiresAuth){
        if(to.meta.requiresAdmin){
          AuthService.IsAuthenticated() && AuthHelpers.getAdminStatus() != 0 ? next(): next('/error/401')
        }
        else{
          AuthService.IsAuthenticated() ? next(): next('/auth/login')
        }
    }
    else{
      next()
    }
})
export default router
