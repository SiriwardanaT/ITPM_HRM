<template>
  <v-container>
    <div class="top-section">
      <h2>Employee List</h2>
      <v-row>
        <v-col cols="9">
          <div class="mt-5 search-bar" style="width:50%">
               <v-text-field
             prepend-inner-icon="mdi-account-search"
            label="Search Employee"
            solo
          ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <v-btn @click="navigateToAddemployee()" class="teal lighten-2 white--text"> Add Employee </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- table section -->
    <div class="table-section">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Employee Name</th>
              <th class="text-left">Email</th>
              <th class="text-left">phone</th>
              <th class="text-left">Gender</th>
              <th class="text-left">Status</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee , index) in EmployeeList" :key="index">
              <td>{{employee.employeeName}}</td>
              <td>{{employee.email}}</td>
              <td>{{employee.phone}}</td>
              <td>{{employee.gender}}</td>
              <td>
                <v-chip
                  outlined
                  small
                  color="green accent-2 white--text"
                  pill
                  class="ma-3"
                >
                  Active
                </v-chip>
              </td>
              <td>
                <v-icon small class="mr-2" @click="editItem(employee._id)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="ml-4" @click="editItem(item)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
import UserService from '../../services/userService'
export default {
    data(){
        return{
            EmployeeList :[]
        }
    },
    methods:{
        navigateToAddemployee(){
            this.$router.push('/member/add')
        },
        editItem(item){
             this.$router.push({path:'/member/update',query:{"_id":item}})
        }
    },
    async created(){
      this.EmployeeList = await UserService.getAllEmployees();
    }
};
</script>

<style>
.table-section {
  margin-top: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.top-section {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>