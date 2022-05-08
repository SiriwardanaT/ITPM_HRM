<template>
  <v-container>
    <div class="top-section">
      <h2>Leave Requests</h2>
      <v-row>
          <v-col cols="9">
          <div class="mt-5 search-bar" style="width:50%">
               <v-text-field
               v-model="searchKey"
             prepend-inner-icon="mdi-calendar-search"
            label="Search Approve emails"
            solo
          ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <v-row>
            <v-btn
              @click="GenerateReport"
              class="teal lighten-2 white--text mb-4"
            >
              Generate a Report
            </v-btn>
          </v-row>
          <v-row>
            <v-btn  @click="navigateToLeaveType" class="teal lighten-2 white--text">
             
              Add New Leave Type
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <div class="table-section">
        <v-simple-table big>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Employee Name</th>
                <th class="text-left">Emplyee Email</th>
                <th class="text-left">Type</th>
                <th class="text-left">Numbers</th>
                <th class="text-left">Leave Dates</th>
                <th class="text-left">Action</th>
                <th class="text-left">Permission</th>
              </tr>
            </thead>
            <tbody>
                <tr  v-if="fliterApprovedLeaves.length == 0"><td >No Approved leaves found</td></tr>
              <tr v-for="(appReq, index) in fliterApprovedLeaves" v-bind:key="index">
                <td>{{ appReq.empId.employeeName }}</td>
                <td>{{ appReq.empId.email }}</td>
                <td>{{ appReq.leaveType }}</td>
                <td>{{ appReq.noOfleaves }}</td>
                <td>{{ appReq.days }}</td>
                <td>
                 
                   <v-chip
                  outlined
                  small
                  :color="appReq.action == 'Approve' ? 'green accent-2 white--text':'red accent-2 white--text'"
                  pill
                  class="ma-3"
                >
                    <span v-if="appReq.action == 'Approve'">Approved</span> 
                  <span v-if="appReq.action == 'Reject'">Reject</span>
                    <span v-if="appReq.action == 'Pending'">Pending</span>
                </v-chip>
               </td>
                <td>
                  <v-select
                    v-model="selectedAction"
                    :items="items"
                    @change="
                      onChange(
                        appReq.empId.employeeName,
                        appReq.empId.email,
                        appReq._id
                      )
                    "
                    label="Pending"
                    color="red"
                    dense
                    solo
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-row>
    <SuccessMsg :msg="Successmsg" v-if="SuccessActive" />
  </v-container>
</template>
<script>
// import moment from "moment";
import ins from "../../Interceptors/axios";
import ReportService from "../../services/ReportGenerateService";
import SuccessMsg from "../../components/Notification/Success.vue";
export default {
  data: () => ({
    searchKey:"",
    Req: [],
    items: ["Approve", "Pending", "Reject"],
    SuccessActive: false,
    Successmsg: "Email is successfully send to the employee",
  }),
  components: {
    SuccessMsg,
  },
  methods: {
    navigateToLeaveType(){
      this.$router.push({ path: "/leave/add" });
    },
    async onChange(empName, empEmail, id) {
      const action = this.selectedAction;

      const updatRequest = await ins.put(`leaveRequest/updateStatus/${id}`, {
        action: action,
      });
      if(updatRequest != null){
         this.SuccessActive = true;
      const result = await ins.post(
        `leaveRequest/sendMails/${empName}/${empEmail}/${action}`
      );
       if(result != null){

       }
      }
     
     
    },
    async getPendingRequests() {
      const getData = await ins.get("/leaveRequest/getAllRequests");
      const getLeaveReqList = _.get(getData, "data", null);
      this.Req = getLeaveReqList;
    },
    async GenerateReport() {
         const customizedLeaveRequests =[];
         this.Req.forEach(element => {
           customizedLeaveRequests.push({
                "employeeName":element.empId.employeeName,
                "email":element.empId.email,
                "type":element.leaveType,
                "days":element.days
           })
         });
      
      const columns = [
        { title: "EmployeeName", dataKey:"employeeName" },
        { title: "email", dataKey: "email" },
        { title: "Type", dataKey: "type" },
        { title: "Days", dataKey: "days" },

      
      ];
       ReportService.genrateReport(columns,"Leave Report",customizedLeaveRequests,"Report of ")
    },
   
  },
   computed:{
        //search filters
        fliterApprovedLeaves(){
            this.dialogDetails = false;
            return this.Req.filter((l)=>{
                 return l.leaveType.match(this.searchKey)
             });
        }
    },
  mounted() {
    this.getPendingRequests();
  },
  
};
</script>
<style scoped>
.table-section {
  margin-top: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
