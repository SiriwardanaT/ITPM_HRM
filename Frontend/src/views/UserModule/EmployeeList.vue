<template>
  <v-container>
    <div class="top-section">
      <h2>Employee List</h2>
      <v-row>
        <v-col cols="9">
          <div class="mt-5 search-bar" style="width:50%">
               <v-text-field
               v-model="searchKey"
             prepend-inner-icon="mdi-account-search"
            label="Search Employee by email or username"
            solo
          ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <v-btn @click="navigateToAddemployee()" class="teal lighten-2 white--text"> Add Employee </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="dowloadReport()" class="teal lighten-2 white--text"> Download PDF </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- table section -->
    <div class="table-section">
      <v-simple-table :items-per-page="5">
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
            <tr  v-if="fliterEmployeeList.length == 0"><td >No employee found</td></tr>
            <tr  v-for="(employee , index) in fliterEmployeeList" :key="index">
              <td>{{employee.employeeName}}</td>
              <td>{{employee.email}}</td>
              <td>{{employee.phone}}</td>
              <td>{{employee.gender}}</td>
              <td>
                <v-chip
                  outlined
                  small
                  :color="employee.status ? 'green accent-2 white--text':'red accent-2 white--text'"
                  pill
                  class="ma-3"
                >
                  <span v-if="employee.status">Active</span> 
                  <span v-if="!employee.status">InActive</span> 
                </v-chip>
              </td>
              <td>
                <v-icon small class="mr-2" @click="editItem(employee._id)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="ml-4" @click="getDeleteDialog(employee._id)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    
    <DeleteModal
      :dialogDetails="dialogDetails"
      @doDelete="deleteRecord(employeeId)"
    />

  </v-container>
</template>

<script>
import UserService from '../../services/userService'
import DeleteModal from '../../components/Notification/DeleteDialog.vue'
import img from '../../../public/logo.png'
import ReportService from '../../services/ReportGenerateService'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import authService from '../../services/authHelpers'
export default {
    data(){
        return{
            EmployeeList :[],
            searchKey :"",
            employeeId :"",
            dialogDetails : false,
            logo_url :img 
        }
    },
    components:{
      DeleteModal
    },
    methods:{
        navigateToAddemployee(){
            this.$router.push('/member/add')
        },
        editItem(item){
             this.$router.push({path:'/member/update',query:{"_id":item}})
        },
        getDeleteDialog(id) {
            
            this.dialogDetails = false;
            this.dialogDetails = true;
            this.employeeId = id;
        },
       async deleteRecord(Id){
              // alert(Id)
              const deleteEmployee = await UserService.deleteEmployee(Id);
              console.log("implemented  =====")
              alert(deleteEmployee)
              if(deleteEmployee){
                    this.dialogDetails = false;
                    setTimeout(() => {
                      this.$router.go();
                  }, 1000);
              }
        },
        //download pdf section
        async dowloadReport(){
              
              const columns = [
                { title: "EmployeeName", dataKey: "employeeName" },
                { title: "email", dataKey: "email" },
                { title: "phone", dataKey: "phone" },
                { title: "gender", dataKey: "gender" },
                { title: "status", dataKey: "status" },
                // { title: "status", dataKey: "status" },
              ];
              ReportService.genrateReport(columns,"ActiveEmployeeList",this.EmployeeList)
              // const doc = new jsPDF({
              //   orientation: "portrait",
              //   unit: "in",
              //   format: "letter"
              // });
              // var img = new Image();
              // img.src = this.logo_url;
              // doc.addImage(img,'png',1.0, 0.01, 1.0, 1.1)
              // doc.setFontSize(10).text("Sales Report Section", 2.5, 0.4);
              // doc.setFontSize(10).text("HRM Company (PVT)", 2.5, 0.6);
              // doc.setFontSize(10).text("Colombo 7", 2.5, 0.8);
              // doc.setFontSize(10).text("0932232233", 2.5, 1.0);
               
              // doc.setFontSize(16).text("HRM System Report", 4.5, 1.0);
              // doc.setFontSize(10).text("REF NO  : ", 7.3, 1.0);
              // doc.setFontSize(10).text("1221", 8.0, 1.0);

              // doc.setFontSize(10).text(`Dowloaded By ${authService.getUsername()}`, 1.0, 2.0);
              
              // doc.setLineWidth(0.01).line(1.0, 1.1, 8.0, 1.1);
              // // Using autoTable plugin
              // doc.setFontSize(12).text("Monthly Active Employee List ", 0.5, 3.0);
              // autoTable(doc,{
              //   columns,
              //   body:this.EmployeeList,
              //   margin: {top: 3.25 }
              // });
              // // Creating footer and saving file
              // doc.save('ActiveEmployeeList.pdf');
            }
        },
    async created(){
      // color="green accent-2 white--text"
      this.EmployeeList = await UserService.getAllEmployees();
      console.log(this.EmployeeList)
    },
    computed:{
        //search filters
        fliterEmployeeList(){
            this.dialogDetails = false;
            return this.EmployeeList.filter((emp)=>{
                 return emp.employeeName.match(this.searchKey) || emp.email.match(this.searchKey)
             });
        }
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