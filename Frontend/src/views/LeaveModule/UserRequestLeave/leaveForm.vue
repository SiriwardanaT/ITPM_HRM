<template>
  <v-container>
    <v-form ref="form">
      <div class="form-styling">
        <v-row> </v-row>
        <v-row>
          <v-col>
            <a href="/leave">Check Leave Info</a>
            <v-select
              v-model="leaveReq.leaveType"
               :rules="leaveType_rule"
              :items="type"
              label="Leave Type"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col>
            <span>Enter Number of leaves</span>
            <v-text-field
              v-model="leaveReq.noOfleaves"
               :rules="noOfleaves_rule"
              type="number"
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
                   :rules="days_rule"
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
                 :rules="days_rule"
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
             <span>Upload any document relevent to the request</span>
                <v-file-input
                  v-model="leaveReq.attachments"
               :rules=" attachments_rule"
                
                
                  outlined
                  dense
                ></v-file-input>
             
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
import Loader from "../../../components/Notification/Loading.vue";
import ErrorMsg from "../../../components/Notification/Error.vue";
import SuccessMsg from "../../../components/Notification/Success.vue";
import _ from "lodash";
export default {
  data: () => ({
    dates: ["2018-09-15", "2018-09-20"],
    type: ["Sick leave", "Maternity leave", "Casual leave"],
    menu: false,
    leaveReq: {
      leaveType: "",
      noOfleaves: "",

      attachments: "",
    },
     leaveType_rule: [
        (v) => !!v || "Leave type is Required",
        
      ],
      noOfleaves_rule: [
        (v) => !!v || "Annual leave numbers are required",
      ],
        days_rule: [
        (v) => !!v || "Annual leave numbers are required",
      (v) => (v && v.length > 1) || "Please requested leave days",
      ],
        attachments_rule: [
        (v) => !!v || "Required",
      ],
  }),
  components: {
    Loader,
    ErrorMsg,
    SuccessMsg
  },
  methods: {
    async createRequest() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        try {
          const formData = new FormData();

          formData.append("leaveType", this.leaveReq.leaveType);
          formData.append("noOfleaves", this.leaveReq.noOfleaves);
          formData.append("days", this.leaveReq.days);
          formData.append("attachments", this.leaveReq.attachments);

          const addRequest = await ins.post(
            "leaveRequest/requestleave",
            formData
          );
          if (addRequest) {
            this.SuccessActive = true;
            setTimeout(() => {
              this.$router.push({ path: "/leaveRequest" });
            }, 2000);
          } else {
            console.log(err);
          }
        } catch (err) {
          this.ErrActive = true;
        }
      }
    },
      clearData() {
      (this.leaveReq.leaveType = ""),
        (this.leaveReq.noOfleaves = ""),
        (this.leaveReq.days = ""),
        (this.leaveReq.attachments = "");
       
    }
  
  }
};
</script>
<style scoped>
.form-styling {
  margin: 25px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
