<template>
  <v-container>
    <v-form ref="form">
      <div class="form-styling">
        <v-row>
          <v-col>
            <v-text-field
              v-model="leaveReq.empName"
              label="Employee Name"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="leaveReq.empEmail"
              label="Employee email"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="leaveReq.leaveType"
              :items="type"
              label="Leave Type"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              v-model="leaveReq.noOfleaves"
              type="number"
              label="Enter Number of leaves"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <!-- <v-col cols="15" sm="6">
            <v-date-picker v-model="dates" multiple></v-date-picker>
          </v-col> -->
          <v-col cols="15" sm="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-combobox
                  v-model="leaveReq.days"
                  multiple
                  chips
                  small-chips
                  label="Multiple picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-combobox>
              </template>
              <v-date-picker
                v-model="leaveReq.days"
                multiple
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(dates)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col>
            <v-tooltip v-model="show1" top>
              <template v-slot:activator="{ on }">
                <v-file-input
                  v-model="leaveReq.attachments"
                  label="Upload any document relevent to the request"
                  @click:append="show1 = !show1"
                  append-icon="mdi-alert-circle-outline"
                  outlined
                  dense
                ></v-file-input>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
            
              class="teal lighten-2 white--text ml-17"
              @click="createRequest"
              large
              style="width: 60%"
            >
              Apply
            </v-btn>
             
          </v-col>
          <v-col>
            <v-btn
              class="red lighten-2 white--text"
              @click="clearData"
              large
              style="width: 60%"
            >
              Cancel
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
import ins from "../../../Interceptors/axios";
// import Loader from "../../components/Notification/Loading.vue";
// import ErrorMsg from "../../components/Notification/Error.vue";
// import SuccessMsg from "../../components/Notification/Success.vue";
import _ from "lodash";
export default {
  data: () => ({
    dates: ["2018-09-15", "2018-09-20"],
    type: ["Sick leave", "Maternity leave", "Casual leave"],
    menu: false,
    leaveReq: {
      empName: "",
      empEmail: "",
      leaveType: "",
      noOfleaves: "",
      days: "",
      attachments:"",
    },
  }),
  components:{
// Loader,
// ErrorMsg,
// SuccessMsg
  },
  methods: {
    async createRequest() {
     
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
     
    
         
          try {
            const formData = new FormData();
            formData.append("empName", this.leaveReq.empName);
            formData.append("empEmail", this.leaveReq.empEmail);
            formData.append("leaveType", this.leaveReq.leaveType);
            formData.append("noOfleaves", this.leaveReq.noOfleaves);
            formData.append("days", this.leaveReq.days);
            formData.append("attachments", this.leaveReq.attachments);
          
            const addRequest = await ins.post("leaveRequest/requestleave", formData);
            if (addRequest) {
           
              this.SuccessActive = true;
             setTimeout(() => {
                this.$router.push({ path: "/leaveRequest" });
              }, 2000);
            } else {
              console.log(err);
            }
          } catch (err) {
            // this.ErrActive = true;
          }
       
      }
    },
   
  },
};
</script>
<style scoped>
.form-styling {
  margin: 25px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
