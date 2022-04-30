<template>
  <v-container>
    <v-row>
        <v-col>
            <h2 v-if="this.$route.path =='/member/update'">Update Employee</h2>
            <h2 v-if="this.$route.path =='/member/add'">Add Employee</h2>
        </v-col>
        <v-col v-if="this.$route.path =='/member/update'">
            <v-card style="height:50px" elevation="6">
                <v-container>
                  <div>
                    <v-chip
                    class=""
                    color="success"
                    outlined
                    pill
                  >
                   EID  {{user.employeeId}}
                    <v-icon right>
                      mdi-account-outline
                    </v-icon>
                  </v-chip>
                  </div>
                </v-container>
               
            </v-card>
        </v-col>
         
    </v-row>
    <!-- form start -->
    <v-form ref="form">
      <div class="form-sec">
        <!-- ------------------Basic informatin section --------------------------- -->
        <div class="mb-3 sub-header-basic">
          <v-chip style="width: 50%">Basic Information</v-chip>
        </div>
        <v-row>
          <v-col>
            <v-text-field
              label="Employee Name"
              outlined
              dense
              v-model="user.employeeName"
              :rules="username_rule"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Phone Number"
              type="number"
              outlined
              v-model="user.phone"
              :rules="phonenum_rules"
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Email Address"
              outlined
              dense
              v-model="user.email"
              :rules="email_rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="NIC"
              outlined
              dense
              v-model="user.Nic"
              :rules="nic_rules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Data Of Birth"
              outlined
              dense
              v-model="user.birthData"
              type="date"
              :rules="date_rule"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              :items="GenderItems"
              v-model="user.gender"
              label="Gender"
              dense
              :rules="gender_rule"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Address"
              outlined
              dense
              v-model="user.address"
              :rules="address_rule"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-file-input label="File input" v-model="user.profile_img" outlined dense></v-file-input>
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
                  v-model="user.jobRole"
                  outlined
                  :rules="jobrole_rule"
                ></v-select>
              </div>
            </v-col>

            <v-col v-if="this.$route.path =='/member/add'">
              <v-chip style="width: 50%">Password Information</v-chip>
              <div class="mt-3">
                <v-text-field
                  label="password"
                  outlined
                  type="password"
                  dense
                  v-model="user.password"
                  :rules="password_rule"
                ></v-text-field>
              </div>
            </v-col>
             <v-col v-if="this.$route.path =='/member/update'">
              <v-chip style="width: 50%">Update Status </v-chip>
              <div class="mt-3">
                      <v-radio-group v-model="user.status">
                          <v-radio
                            label="Active"
                            value="true"
                            key="1"
                          ></v-radio>
                           <v-radio
                            key="2"
                            label="Inactive"
                            value="false"
                          ></v-radio>
                      </v-radio-group>
              </div>
            </v-col>
          </v-row>
          <!-- button section  -->
          <div class="button-section">
            <v-btn
              @click="login"
              class="teal lighten-2 white--text"
              style="width: 25%"
            >
              Save
            </v-btn>
            <v-btn class="ma-2 white--text" style="width: 10%" color="orange">
              Clear
            </v-btn>
          </div>
        </div>
      </div>
    </v-form>
    <Loader v-if="Isloading" />
    <ErrorMsg :msg="Errormsg" v-if="ErrActive" />
    <SuccessMsg :msg = "Successmsg" v-if="SuccessActive"/>
  </v-container>
</template>

<script>
import Loader from "../../components/Notification/Loading.vue";
import UserAPI from "../../services/userService"
import ErrorMsg from "../../components/Notification/Error.vue"
import SuccessMsg from "../../components/Notification/Success.vue"
import axios from 'axios';
export default {
  data() {
    return {
      title:"",
      check: "",
      Isloading: true,
      Errormsg:"Already Created User",
      ErrActive :false,
      SuccessActive:false,
      Successmsg :"Employee Created",
      GenderItems: ["Male", "Female"],
      JobRole: [
        "Intern",
        "Manager",
        "Senior Software Engineer",
        "Associate Software Engineer",
        "Consultant",
        "Junior Executive",
      ],
      username_rule: [
        (v) => !!v || "User Name is Required",
        (v) => (v && v.length > 6) || "Invalid User name",
      ],
      email_rules: [
        (v) => !!v || "Email is Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phonenum_rules: [
        (v) => !!v || "Phone Number is Required",
        (v) => (v && v.length < 11) || "Invalid phone number",
      ],
      nic_rules: [
        (v) => !!v || "NIC is Required",
        (v) => (v && v.length < 11) || "Invalid NIC",
      ],
      date_rule: [(v) => !!v || "Date is Required"],
      gender_rule: [(v) => !!v || "Gender is Required"],
      address_rule: [(v) => !!v || "Address is Required"],
      password_rule: [
        (v) => !!v || "Password is Required",
        (v) => (v && v.length < 11) || "Invalid Password",
      ],
      jobrole_rule: [(v) => !!v || "Job role is Required"],

      //bind data
      user: {
        _id:"",
        employeeId:"",
        employeeName: "",
        phone: "",
        email: "",
        Nic: "",
        birthData: "",
        address: "",
        jobRole: "",
        gender: "",
        profile_img: "",
        password: "",
        status:""
      },
    };
  },
  components: {
    Loader,
    ErrorMsg,
    SuccessMsg
  },
  methods: {
    async login() {
     
      this.SuccessActive = false;
      this.ErrActive = false;
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
          this.Isloading = true;
          console.log(this.user)
          if(this.$route.path =='/member/update'){
              console.log(this.user);
              this.Isloading = true;
              const IsUpdate = await UserAPI.updateEmployee(this.user,this.user._id);
              if(IsUpdate){
                  this.Isloading = false;
                  this.SuccessActive = true;
                  this.Successmsg = "Updated SuccessFully"
              }
              else{
                  this.ErrActive = true
                  this.Isloading = false;
                  this.Errormsg = "No changes found"
              }
              

          }
          else if(this.$route.path =='/member/add'){
           const fd = new FormData();
           fd.append("employeeName",this.user.employeeName)
           fd.append("phone",this.user.phone)
           fd.append("email",this.user.email)
           fd.append("Nic",this.user.Nic)
           fd.append("birthData",this.user.birthData)
           fd.append("address",this.user.address)
           fd.append("jobRole",this.user.jobRole)
           fd.append("gender",this.user.gender)
           fd.append("password",this.user.password)
           fd.append("status",this.user.status)
           fd.append("profile",this.user.profile_img)
            const IsCreate = await UserAPI.addEmployee(fd);
            // IsCreate ? this.SuccessActive : this.ErrActive = true
            if(IsCreate){
               this.SuccessActive = true;
               this.Isloading = false;
            }
            else{
                this.ErrActive = true
                this.Isloading = false;
            }
          }
          else{
             alert("Invalid")
          }
          
      }
    },
  },
  async created() {
    setTimeout(async() => {
      if(this.$route.path =='/member/update'){
          const UserId = this.$route.query._id
          const Curruntuser = await UserAPI.getEmployeeById(UserId);
          this.user = Curruntuser;
          this.user.birthData = Curruntuser.birthData.split('T')[0]
      }
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