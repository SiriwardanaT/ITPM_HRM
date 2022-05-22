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
import LeaveRequest from '../views/LeaveModule/UserRequestLeave/leaveRequest.vue';
import AllRequest from '../views/LeaveModule/UserRequestLeave/allLeaveRequest.vue';
import ApprvReject from '../views/LeaveModule/leaveApproveReject.vue';
import EmpLeaves from '../views/LeaveModule/UserRequestLeave/emLeaveHistory.vue'
import Holiday from '../views/HolidayModule/holiday.vue'

//user module
import EmployeeList from '../views/UserModule/EmployeeList.vue'
import AddEmployee from '../views/UserModule/AddNewUser.vue'
import Profile from '../views/UserModule/Profile.vue'
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
    component:AllLeave,
    meta: { requiresAuth: true}
   
  },
  {
    path: '/leave/add',
    name: 'leave',
    component:Leave,
    meta: { requiresAuth: true ,requiresAdmin :true}
  },
  {
    path: '/leave/update',
    name: 'leave',
    component:Leave,
    meta: { requiresAuth: true ,requiresAdmin :true}
  },
  {
    path: '/leaveRequest/add',
    name: 'leaveRequest',
    component:LeaveRequest,
    meta: { requiresAuth: true ,requiresAdmin :false}
  },
  {
    path: '/leaveRequest',
    name: 'leaveRequest',
    component:AllRequest,
    meta: { requiresAuth: true ,requiresAdmin :false}
  },

  {
    path: '/leaveRequest/update',
    name: 'leaveRequest',
    component:Leave,
    meta: { requiresAuth: true ,requiresAdmin :false}
  },
  {
    path: '/leaveRequest/leaveHistory',
    name: 'leaveRequest',
    component:EmpLeaves,
    meta: { requiresAuth: true ,requiresAdmin :false}
  },
  
  {
    path: '/ApprReject',
    name: 'leave',
    component:ApprvReject,
    meta: { requiresAuth: true ,requiresAdmin :true}
  },

  {
    path:'/member',
    name :"EmployeeList",
    component:EmployeeList,
    meta: { requiresAuth: true ,requiresAdmin :true}
  },
   
 
  {
    path:'/member/:mode',
    name :"AddNewEmployee",
    component:AddEmployee,
    meta: { requiresAuth: true ,requiresAdmin :true}
  },
  {
    path:'/profile',
    component:Profile,
    meta: { requiresAuth: true ,requiresAdmin :false}
  },
  {
    path: '/holiday',
    name: 'holiday',
    component:Holiday,
  
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
