<template>
  <div>
    <!-- left side view -->
    <v-row>
      <v-col cols="4" class="cyan" style="height: 100vh">
        <h1 id="heading" class="mt-6 white--text">HRM</h1>
        <img
          :src="img_log"
          alt=""
          height="200"
          style="margin-top: 30%; margin-left: 25%"
        />
      </v-col>
      <!-- right side view -->
      <v-col>
        <div class="error-msg" v-if="true">
          <ErrorMsg :msg="msg" v-if="isActive" />
        </div>
        <h1 class="mt-15 black--text">LOGIN</h1>
        <div style="width: 50%; margin-left: 25%; margin-top: 5%">
          <v-container>
            <v-form class="login-form" ref="form">
              <v-text-field
                label="Employee Name"
                outlined
                v-model="user.employeeName"
                :rules="username_rule"
                prepend-inner-icon="mdi-account"
                dense
              ></v-text-field>

              <v-text-field
                label="Password"
                type="password"
                v-model="user.password"
                :rules="password_rule"
                prepend-inner-icon="mdi-lock"
                outlined
                dense
              ></v-text-field>
              <v-btn
                @click="login"
                class="teal lighten-2 white--text"
                style="width: 100%"
              >
                Login
              </v-btn>
              <p class="mt-3" style="font-size: 16px">
                Forgot Password <a href="">Reset Password</a>
              </p>
            </v-form>
          </v-container>
        </div>
      </v-col>
    </v-row>
    <v-overlay :value="overlay" v-if="Isloading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import logo from "../../../public/logo1.png";
import ErrorMsg from "../../components/Notification/Error.vue";
import AuthAPI from '../../services/authServices'
export default {
  data() {
    return {
      username_rule : [v=> !! v  || "User Name is Required", v=>v && v.length > 6 || "Invalid User name"],
      password_rule : [v=> !! v || "Password is Required" , v => v && v.length > 3 || "Invalid Password" ],
      img_log: logo,
      display: false,
      msg: "Invalid User name or password",
      isActive: false,
      Isloading:false,

      // bind data
      user:{
        employeeName :"",
        password:""
      }
     
    };
  },
  components: {
    ErrorMsg,
  },
  methods: {
    async login() {
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        this.Isloading = true;
        this.isActive = false
        //login api call
        const IsLogin = await AuthAPI.login(this.user)
        if(IsLogin){
          this.Isloading = false
          this.$router.push({ path: '/' })
        }
        else{
          this.Isloading = false
          this.isActive = true
        }

        


      }
     
     
    
    },
  },
};
</script>

<style>
#heading {
  font-size: 30px;
}
.login-form {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 15px;
}
</style>