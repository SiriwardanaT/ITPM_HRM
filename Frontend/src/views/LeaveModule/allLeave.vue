<template>
  <v-container>
    <div class="top-section">
      <h2>Leave Types</h2>
      <v-row>
        <v-col cols="9"> </v-col>
        <v-col>
          <v-btn @click="addLeave()" class="teal lighten-2 white--text">
            Add New Leave Type
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
              <th class="text-left">Leave Name</th>
              <th class="text-left">Annual leaves</th>
              <th class="text-left">Monthly leaves</th>
              <th class="text-left">Salary Deduct</th>
              <th class="text-left">Description</th>
              <th class="text-left">Applicable people</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(leave, index) in leavesList" v-bind:key="index">
              <td>{{ leave.leaveName }}</td>
              <td>{{ leave.annualLeaveNumber }}</td>
              <td>{{ leave.monthLeaveNumber }}</td>
              <td>{{ leave.salaryDeduction }}</td>
              <td>{{ leave.description }}</td>
              <td>{{ leave.applicablePeople }}</td>

              <td>
                <v-icon
                  small
                  class="mr-1"
                  color="orange"
                  @click="getRowData(leave._id)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  class="ml-3"
                  color="red"
                  @click="getDeleteDialog(leave._id)"
                >
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
      @doDelete="deleteRecord(leaveId)"
    />
  </v-container>
</template>

<script>
import ins from "../../Interceptors/axios";
// import { mdiAlertCircleOutline } from '@mdi/js';
import _ from "lodash";

// import UpdateModal from './modals/UpdateLeaveTypeModal.vue';
import DeleteModal from "../../components/Notification/DeleteDialog.vue";

export default {
  data() {
    return {
      leavesList: [],
      dialogDetails: false,
    };
  },
  components: {
    DeleteModal,
  },
  methods: {
    addLeave() {
      this.$router.push("/leave/add");
    },
    async getRowData(id) {
      this.$router.push({path:"/leave/update",query:{_id:id}});
     
    },
    getDeleteDialog(id) {
      this.dialogDetails = false;
      this.dialogDetails = true;
      this.leaveId = id;
    },
    async deleteRecord(leaveId) {
      console.log("leaveId", leaveId);
      const getDeleteSuccess = await ins.delete(
        `/leaveType/deleteLeave/${leaveId}`
      );

      if (getDeleteSuccess) {
        this.dialogDetails = false;
        this.$router.go();
      }
    },
    async getLeaves() {
      const getData = await ins.get("/leaveType/getLeave");
      const getLeaveList = _.get(getData, "data", null);
      console.log("check", getLeaveList);
      this.leavesList = getLeaveList;
    },
  },
  mounted() {
    this.getLeaves();
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
