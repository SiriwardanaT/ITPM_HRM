<template>
  <v-container>
    <h2>Add Employee</h2>
    <v-row> </v-row>
    <!-- form start -->
    <v-form ref="form">
    <div class="form-sec">
      <!-- ------------------Basic informatin section --------------------------- -->
      <div class="mb-3 sub-header-basic">
        <v-chip style="width: 50%">Basic Information</v-chip>
      </div>
      <v-row>
        <v-col>
          <v-text-field label="Employee Name" 
          outlined 
          dense
          :rules="username_rule"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Phone Number"
            type="number"
            outlined
            :rules="phonenum_rules"
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Email Address" outlined dense :rules="email_rules"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="NIC" outlined dense :rules="nic_rules"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Data Of Birth" outlined dense type="date" :rules="date_rule" ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            :items="GenderItems"
            label="Gender"
            dense
            :rules="gender_rule"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Address" outlined dense :rules="address_rule"></v-text-field>
        </v-col>
        <v-col>
          <v-file-input label="File input" outlined dense></v-file-input>
        </v-col>
      </v-row>

      <!-- ------------------Job Role informatin section and password  --------------------------- -->
      <div class="mb-3 sub-header-jobrole">
        <v-row>
          <v-col>
            <v-chip style="width: 50%">Job Role Information</v-chip>
            <div class="mt-3">
              <v-select
                :items="JobRole"
                label="Select Job Role"
                dense
                outlined
                :rules="jobrole_rule"
              ></v-select>
            </div>
          </v-col>

          <v-col>
            <v-chip style="width: 50%">Password Information</v-chip>
            <div class="mt-3">
              <v-text-field
                label="password"
                outlined
                type="password"
                dense
                :rules="password_rule"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
        <!-- button section  -->
        <div class="button-section">
          <v-btn @click="login" class="teal lighten-2 white--text" style="width: 25%">
            Save
          </v-btn>
          <v-btn class="ma-2 white--text" style="width: 10%"  color="orange">
            Clear
          </v-btn>
        </div>
      </div>
    </div>
    </v-form>
    <Loader v-if="Isloading" />
  </v-container>
  
</template>

<script>
import Loader from "../../components/Notification/Loading.vue";
export default {
  data() {
    return {
      check:"",
      Isloading: true,
      GenderItems: ["Male", "Female"],
      JobRole :["Intern", "Manager","Senior Software Engineer","Associate Software Engineer","Consultant"],
      username_rule : [v=> !! v  || "User Name is Required", v=>v && v.length > 6 || "Invalid User name"],
      email_rules : [v=> !!v || "Email is Required" ,v=> /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      phonenum_rules : [v=> !! v || "Phone Number is Required", v => v && v.length < 11 || "Invalid phone number"],
      nic_rules : [v=> !! v || "NIC is Required" , v => v && v.length < 11 || "Invalid NIC"],
      date_rule : [v=> !! v || "Date is Required"],
      gender_rule : [v=> !! v || "Gender is Required"],
      address_rule : [v=> !! v || "Address is Required"],
      password_rule : [v=> !! v || "Password is Required" , v => v && v.length > 11 || "Invalid Password" ],
      jobrole_rule : [v => !! v || "Job role is Required"]
    };
  },
  components: {
    Loader,
  },
  methods:{
     login(){
       this.$refs.form.validate();
       if(this.$refs.form.validate()){
          alert("success")
       }
     }
  },
  created() {
    setTimeout(() => {
      this.Isloading = false;
    }, 2000);
  },
};
</script>

<style>
.form-sec {
  margin: 50px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>