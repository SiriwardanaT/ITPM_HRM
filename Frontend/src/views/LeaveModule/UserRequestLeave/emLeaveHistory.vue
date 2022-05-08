<template>
    <v-container>
    <div class="top-section">
      <h2>My Leave History</h2>
      <v-row>
        <v-col cols="9"> </v-col>
      </v-row>
    </div>

    <!-- table section -->
    <div class="table-section">
      <v-simple-table big>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Leave Type</th>
              <th class="text-left">No of Leaves</th>
              <th class="text-left">Requested Leave Dates</th>
              <th class="text-left">Status</th>
             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(leave, index) in Req" v-bind:key="index">
              <td>{{ leave.leaveType }}</td>
              <td>{{ leave.noOfleaves }}</td>
              <td>{{ leave.days }}</td>
              <td>{{ leave.action }}</td>
             </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

 
  </v-container>
</template>
<script>
import ins from '../../../Interceptors/axios';
export default {
  data() {
    return {
      Req: [],
     
    };
  },

  methods: {
 
  
    async getLeaveHistory() {
    
      const getData = await ins.get("leaveRequest/getEmpOwnLeaves");
      console.log("vv",getData);
      const getLeaveList = _.get(getData, "data", null);
      console.log("dd",getLeaveList);
      this.Req = getLeaveList;
    },
  },
  mounted() {
    this.getLeaveHistory();
  },
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
