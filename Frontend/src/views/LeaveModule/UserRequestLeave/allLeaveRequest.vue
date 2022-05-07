<template>
  <v-container>
    <div class="top-section">
      <h2>Leave Types</h2>
      <v-row>
        <v-col cols="9"> </v-col>
        <v-col>
          <v-btn @click="requestLeave()" class="teal lighten-2 white--text">
            Add leave request
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- table section -->
    <div class="table-section">
      <v-simple-table big>
        <template v-slot:default>
          <thead>
            <tr>
                <th class="text-left">Name</th>
              <th class="text-left">email</th>
              <th class="text-left">Leave Type</th>
              <th class="text-left">Number of days</th>
                <th class="text-left"> days</th>
              <th class="text-left">attachments</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(leaveReq, index) in latestReq" v-bind:key="index" >
            <td>{{ leaveReq.empName}}</td>
              <td>{{ leaveReq.empEmail}}</td>
              <td>{{ leaveReq.leaveType }}</td>
              <td>{{ leaveReq.noOfleaves }}</td>
              <td>{{ leaveReq.days }}</td>
              <td>{{ leaveReq.attachments }}</td>

              <td>
                <v-btn
                  small 
                  class="mr-1"
                  color="orange"
                  @click="getRowData(leave._id)"
                >
                Edit
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <!-- <ErrorMsg :msg="Errormsg" v-if="ErrActive" />
    <SuccessMsg :msg="Successmsg" v-if="SuccessActive" /> -->
  </v-container>
</template>

<script>
import ins from "../../../Interceptors/axios";
import _ from "lodash";
// import DeleteModal from "../../components/Notification/DeleteDialog.vue";
// import ErrorMsg from "../../components/Notification/Error.vue";
// import SuccessMsg from "../../components/Notification/Success.vue";

export default {
  data() {
    return {
      latestReq: [],
      dialogDetails: false,
      Errormsg: "Something went wrong while adding data",
      ErrActive: false,
      SuccessActive: false,
      Successmsg: "Record Successfully Deleted !",
    };
  },
  components: {
    // DeleteModal,
    // ErrorMsg,
    // SuccessMsg,
  },
  methods: {
    requestLeave() {
      this.$router.push("/leaveRequest/add");
    },
    async getRowData(id) {
      this.$router.push({ path: "/leave/update", query: { _id: id } });
    },
    
   
    async getRequestedLeave() {
      const getData = await ins.get(`/leaveRequest/getDataFor`);
      const getLeaveList = _.get(getData, "data", null);
      this.latestReq = getLeaveList;
    },
  },
  mounted() {
    this.getRequestedLeave();
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
