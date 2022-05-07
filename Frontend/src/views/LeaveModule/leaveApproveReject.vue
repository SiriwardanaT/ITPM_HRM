<template>
  <v-container>
    <div class="top-section">
      <h2>Leave Requests</h2>
      <v-row>
       
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
            <v-btn class="teal lighten-2 white--text">
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
                <th class="text-left">daysssssssssssssssss</th>
                <th class="text-left">Attachments</th>
                <th class="text-left">Permission</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(appReq, index) in Req" v-bind:key="index">
                <td>{{ appReq.empName }}</td>
                <td>{{ appReq.empEmail }}</td>
                <td>{{ appReq.leaveType }}</td>
                <td>{{ appReq.noOfleaves }}</td>
                <td>{{ appReq.days }}</td>
                <td>{{ appReq.attachments }}</td>

                <td>
                  <v-select
                    v-model="selectedAction"
                    :items="items"
                    @change="
                      onChange(appReq.empName, appReq.empEmail, appReq._id)
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
    Req: [],
    items: ["Approve", "Pending", "Rejected"],
    SuccessActive: false,
    Successmsg: "Email is successfully send to the employee",
  }),
  components: {
    SuccessMsg,
  },
  methods: {
    async onChange(empName, empEmail, id) {
      const action = this.selectedAction;
      console.log("action", action);
      console.log("name", id);

      if (action == "Approve") {
        const result = await ins.post(
          `leaveRequest/sendMails/${empName}/${empEmail}`,
          action
        );
        if(result){
             this.SuccessActive = true;
        }
        try {
          const deleteRecord = await ins.delete(
            `leaveRequest/deleteApproved/${this.id}`
          );
          console.log("delete", deleteRecord.data);
        } catch (err) {
          console.log(err);
        }

        // console.log("result");
        //   setTimeout(() => {
        //      const deleteRecord =  ins.delete(`leaveRequest/deleteApproved/${id}`);
        //      console.log("delete")
        //   }, 1500);
        if (result) {
        } else {
          console.log("err");
        }
      }
    },
    async getPendingRequests() {
      const getData = await ins.get("/leaveRequest/getAllRequests");
      const getLeaveReqList = _.get(getData, "data", null);
      this.Req = getLeaveReqList;
    },
    async GenerateReport() {
      const columns = [
        { title: "EmployeeName", dataKey: "empName" },
        { title: "email", dataKey: "empEmail" },
        { title: "Type", dataKey: "leaveType" },
        { title: "Days", dataKey: "days" },

        // { title: "status", dataKey: "status" },
      ];
      ReportService.genrateReport(columns, "SignLists", this.Req);
    },
    // async searchRequests(){
    //      return this.Req.days.filter((d)=>{
    //          return d.days.match(this.date);
    //      })
    // }
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
