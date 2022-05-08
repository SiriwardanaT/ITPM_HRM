<template>
  <v-app-bar   elevation="2">
    <h1 class="pa-3" style="font-family: 'Nunito Sans', sans-serif">HRM</h1>

    <v-chip outlined small color="cyan darken-3 white--text" pill class="ma-3">
      <v-icon class="ma-1" small>mdi-domain</v-icon>
      Add Employee
    </v-chip>
    <v-chip outlined small color="cyan darken-3 white--text" pill class="ma-3">
      <v-icon class="ma-1" small>mdi-domain</v-icon>
     Job Roles
    </v-chip>

    <v-chip
      outlined
      @click="navigate"
      small
      color="cyan darken-3 white--text"
      pill
      class="ma-3"
    >
      <v-icon  class="ma-1" small>mdi-calendar-account</v-icon>
      All Reports
    </v-chip>

    <v-chip outlined small color="cyan darken-3 white--text" pill class="ma-3">
      <v-icon class="ma-1" small>mdi-calendar-account</v-icon>
      Leave Types
    </v-chip>
    <div style="margin-top:30px">
        <v-text-field
            small
            solo
            label="Search Employee"
            prepend-inner-icon="mdi-calendar-account"
          ></v-text-field>
    </div>
    <v-spacer></v-spacer>
    <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
       <v-avatar color="red" v-cloak  v-bind="attrs"
          v-on="on">
      <span class="white--text text-h6">{{current_user_name[0]}}</span>
    </v-avatar>
    </template>
     <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="red"
              >
                <span class="white--text text-h6"><img :src="current_img" alt=""></span>
              </v-avatar>
              <h3>{{current_user_name}}</h3>
              <p class="text-caption mt-1">
                  <v-chip
      class="ma-2"
      color="primary"
      outlined
      pill
    >
       {{admin}}
      <v-icon right>
        mdi-account-outline
      </v-icon>
    </v-chip>
              
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="navigateToProfile()"
              >
                {{admin}} Profile
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                @click="logout"
                depressed
                rounded
                text
              >
               Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
    </v-menu>
   
       
  </v-app-bar>
</template>

<script>
import AuthHelpers from '../../services/authHelpers'
export default {
  data(){
    return{
      admin:AuthHelpers.getAdminStatus() != 0 ? "Admin" : "User",
      current_user_name :"",
      current_img :"",
       items: [
        { title: 'My Profile' },
        { title: 'Settings' },
        { title: 'login as employee' },
        { title: 'Log out' },
      ],
    }
  },
  methods:{
    logout(){
      AuthHelpers.logout();
      this.$router.push({ path: '/auth/login' })
    },
    navigateToProfile(){
       this.$router.push({ path: '/profile' })
    }
  },
  created(){
     this.current_user_name = AuthHelpers.getUsername();
     this.current_img = AuthHelpers.getUserProfileImage();
  }
};
</script>

<style>
.list{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 10px !important;
}
</style>
