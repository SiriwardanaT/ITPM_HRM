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
             
              <th class="text-left">Leave Type</th>
              <th class="text-left">Number of days</th>
              <th class="text-left">days</th>
              <th class="text-left">attachments</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(leaveReq, index) in latestReq" v-bind:key="index">
              <td>{{ leaveReq.leaveType }}</td>
              <td>{{ leaveReq.noOfleaves }}</td>
              <td>{{ leaveReq.days }}</td>
              <td>{{ leaveReq.attachments }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <v-row>
      <v-chip style="width: 40%" 
        >If there is any changes Please contact HR department
      </v-chip>
    </v-row>
  </v-container>
</template>

<script>
import ins from "../../../Interceptors/axios";
import _ from "lodash";

export default {
  data() {
    return {
      latestReq: [],
      dialogDetails: false,
    };
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
