<template>
  <v-container>
    <v-form ref="form">
         <div class="form-styling">
      <v-row>
        <v-text-field
          v-model="leave.leaveName"
          :rules="leaveName_rule"
          label="Leave type"
          outlined
          dense
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col>
          <v-tooltip v-model="show1" top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="leave.annualLeaveNumber"
                :rules="annualLeaveNumber_rule"
                type="number"
                :min="1"
                :max="30"
                label="Number of leaves (Annual)"
                append-icon="mdi-alert-circle-outline"
                solo
                @click:append="show1 = !show1"
                inline
                controls
                outlined
                dense
              >
              </v-text-field>
            </template>
            <span
              >a paid number of days each year that an employee is allowed to be
              away from work</span
            >
          </v-tooltip>
        </v-col>
        <v-col>
          <v-tooltip v-model="show2" top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="leave.monthLeaveNumber"
                :rules="monthLeaveNumber_rule"
                type="number"
                :min="1"
                :max="30"
                label="Number of leaves (Monthly)"
                append-icon="mdi-alert-circle-outline"
                solo
                @click:append="show2 = !show2"
                inline
                controls
                outlined
                dense
              >
              </v-text-field>
            </template>
            <span
              >a paid number of days each month that an employee is allowed to
              be away from work</span
            >
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="leave.salaryDeduction"
            :rules="salaryDeduction_rule"
            :items="yesNo"
            label="Salary deduction"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="leave.applicablePeople"
            :rules="applicablePeople_rule"
            :items="items"
            label="Applicable people"
            multiple
            outlined
            dense
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-textarea
          v-model="leave.description"
          :rules="description_rule"
          solo
          name="input-7-4"
          label="Mention key Description about the leave"
          outlined
          dense
        ></v-textarea>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            v-if="this.$route.path == '/leave/add'"
            @click="addLeave()"
            class="teal lighten-2 white--text ml-17"
            large
            style="width: 60%"
          >
            save changes
          </v-btn>

          <v-btn
            v-if="this.$route.path == '/leave/update'"
            @click="updateLeave()"
            class="teal lighten-2 white--text"
            large
            style="width: 60%"
          >
            Update Changes
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="red lighten-2 white--text"
            @click="clearData"
            large
            style="width: 60%"
          >
            Clear
          </v-btn>
        </v-col>
      </v-row>
      </div>
    </v-form>
    <Loader v-if="Isloading" />
    <ErrorMsg :msg="Errormsg" v-if="ErrActive" />
    <SuccessMsg :msg="Successmsg" v-if="SuccessActive" />
  </v-container>
</template>
<script>
import ins from "../../Interceptors/axios";
import Loader from "../../components/Notification/Loading.vue";
import ErrorMsg from "../../components/Notification/Error.vue";
import SuccessMsg from "../../components/Notification/Success.vue";
import _ from "lodash";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      Isloading: false,
      Errormsg: "Something went wrong while adding data",
      ErrActive: false,
      SuccessActive: false,
      Successmsg: "Successfully added a new leave Type",
      items: ["Interns", "Permanants", "All"],
      yesNo: ["Yes", "No"],
      leave: {},
      leaveName_rule: [
        (v) => !!v || "Leave Name is Required",
        (v) => (v && v.length > 2) || "Please Enter valid leave type name",
      ],
      annualLeaveNumber_rule: [
        (v) => !!v || "Annual leave numbers are required",
      ],
      monthLeaveNumber_rule: [
        (v) => !!v || "Monthly leave numbers are required",
      ],
      salaryDeduction_rule: [(v) => !!v || "Select a option"],
      applicablePeople_rule: [
        (v) => (v && v.length >= 1) || "Please select at least one person",
      ],
      description_rule: [(v) => !!v || "Please mention about leave key points"],
    };
  },
  components: {
    Loader,
    ErrorMsg,
    SuccessMsg,
  },
  methods: {
    async addLeave() {
      this.SuccessActive = false;
      this.ErrActive = false;
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        if (this.$route.path == "/leave/add") {
          try {
            const addLeaveType = await ins.post(
              "leaveType/addLeave",
              this.leave
            );
            if (addLeaveType) {
              this.SuccessActive = true;

              setTimeout(() => {
                this.$router.push({ path: "/leave" });
              }, 2000);
            }
          } catch (err) {
            this.ErrActive = true;
          }
        }
      }
    },
    async updateLeave() {
        this.$refs.form.validate();
        if (this.$refs.form.validate()) {
      const leaveId = this.$route.query._id;
      try{
       const updateLeaveType = await ins.put(
        `leaveType/updateLeave/${leaveId}`,
        this.leave
      );
        if (updateLeaveType) {
        this.SuccessActive = true;
        this.Successmsg = "Updated SuccessFully";
         setTimeout(() => {
                this.$router.push({ path: "/leave" });
              }, 2000);
       
      }
      }catch(err){
         this.ErrActive = true;
        this.Isloading = false;
      }
     
    }
     
    },
    clearData() {
      (this.leave.leaveName = ""),
        (this.leave.annualLeaveNumber = ""),
        (this.leave.monthLeaveNumber = ""),
        (this.leave.salaryDeduction = ""),
        (this.leave.description = ""),
        (this.leave.applicablePeople = "");
    },
  },
  async created() {
    if (this.$route.path == "/leave/update") {
      const leaveId = this.$route.query._id;
      const exisitingLeave = await ins.get(`/leaveType/getDataFor/${leaveId}`);
      const getReleventData = _.get(exisitingLeave, "data", null);
      this.leave = getReleventData;
    }
    
  },
};
</script>
<style scoped>
.form-styling {
  margin: 25px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
