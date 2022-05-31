<template>
  <v-container>
    <div class="top-section">
      <h2>Leave Types</h2>
      <v-row>
        <v-col cols="9"> </v-col>
        <v-col>
          <v-btn
            v-if="currentUserRole != 0"
            @click="addLeave()"
            class="teal lighten-2 white--text"
          >
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
              <th class="text-left" scope="col">Leave Name</th>
              <th class="text-left" scope="col">Annual leaves</th>
              <th class="text-left" scope="col">Monthly leaves</th>
              <th class="text-left" scope="col">Salary Deduct</th>
              <th class="text-left" scope="col">Description</th>
              <th class="text-left" scope="col">Applicable people</th>
              <th v-if="currentUserRole != 0" scope="col" class="text-left">Actions</th>
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

              <td v-if="currentUserRole != 0">
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
                  class="ml-4"
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
    <ErrorMsg :msg="Errormsg" v-if="ErrActive" />
    <SuccessMsg :msg="Successmsg" v-if="SuccessActive" />
  </v-container>
</template>

<script>
import ins from "../../Interceptors/axios";
import _ from "lodash";
import DeleteModal from "../../components/Notification/DeleteDialog.vue";
import ErrorMsg from "../../components/Notification/Error.vue";
import SuccessMsg from "../../components/Notification/Success.vue";
import AuthHelper from "../../services/authHelpers";

export default {
  data() {
    return {
      currentUserRole: AuthHelper.getAdminStatus(),
      leavesList: [],
      dialogDetails: false,
      Errormsg: "Something went wrong while adding data",
      ErrActive: false,
      SuccessActive: false,
      Successmsg: "Record Successfully Deleted !",
    };
  },
  components: {
    DeleteModal,
    ErrorMsg,
    SuccessMsg,
  },
  methods: {
    addLeave() {
      this.$router.push("/leave/add");
    },
    async getRowData(id) {
      this.$router.push({ path: "/leave/update", query: { _id: id } });
    },
    getDeleteDialog(id) {
      this.dialogDetails = false;
      this.dialogDetails = true;
      this.leaveId = id;
    },
    async deleteRecord(leaveId) {
      try {
        const getDeleteSuccess = await ins.delete(
          `/leaveType/deleteLeave/${leaveId}`
        );
        if (getDeleteSuccess) {
          this.dialogDetails = false;

          setTimeout(() => {
            this.$router.go();
          }, 2000);
          this.SuccessActive = true;
        }
      } catch (err) {
        this.ErrActive = true;
      }
    },
    async getLeaves() {
      const getData = await ins.get("/leaveType/getLeave");
      const getLeaveList = _.get(getData, "data", null);
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
