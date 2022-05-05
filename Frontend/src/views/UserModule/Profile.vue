<template>
  <v-container>
    <v-row>
      <v-card
        style="margin-top: 12px"
        class="mx-auto"
        max-width="1000"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">
              <h2>{{userObj.employeeId}}</h2>
            </div>
            <v-list-item-title class="text-h5 mb-1">
             {{userObj.employeeName}}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip class="ma-2" color="pink" label text-color="white">
                <v-icon left> mdi-label </v-icon>
               {{userObj.jobRole}}
              </v-chip>
              <v-chip class="ma-2" color="green" label text-color="white">
                <v-icon left> mdi-calendar-search </v-icon>
                Show My leaves
              </v-chip>
              <v-chip class="ma-2" color="blue" label text-color="white">
                <v-icon left>mdi-cash-multiple</v-icon>
                Show Salary Information
              </v-chip>
              <v-chip class="ma-2" color="red" label text-color="white">
                <v-icon left> mdi-folder-settings </v-icon>
                My Assign Projects
              </v-chip>
            </v-list-item-subtitle>
            <div class="" style="margin-top: 30px">
              <h3>Basic Information</h3>
            </div>
            <div class="table">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Email</th>
                      <th class="text-left">phone</th>
                      <th class="text-left">NIC</th>
                      <th class="text-left">Address</th>
                      <th class="text-left">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{userObj.employeeName}}</td>
                      <td>{{userObj.email}}</td>
                      <td>{{userObj.phone}}</td>
                      <td>{{userObj.Nic}}</td>
                      <td>{{userObj.address}}</td>
                      <td>{{userObj.gender}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <div class="" style="margin-top: 50px">
                <h3>Job Role Information</h3>
              </div>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Current Job Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{userObj.jobRole}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-list-item-content>
 
          <v-list-item-avatar tile size="80" color="grey">
           
             <img :src="userObj.profile_img" alt="">
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text><Updatemodal /> </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

  </v-container>
  
</template>

<script>
import UserService from '../../services/userService'
import Updatemodal from '../../views/UserModule/UpdatemodalView.vue'
export default {
       data(){
          return{
              userObj :"",
              dialog: false
          }
       },
       components:{
         Updatemodal
       },
       async created(){
           const user = await UserService.getUserProfile();
           this.userObj = user;
           this.$store.commit("ToStoreCurrentUser",user);
           
       }
  
};
</script>

<style>
</style>