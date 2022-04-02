<template>
  <div>
    <!-- left side view -->
    <v-row>
      <v-col cols="4" class="cyan" style="height: 100vh">
        <center><h1 id="heading" class="mt-6 white--text">HRM</h1></center>
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
        <center><h1 class="mt-15 black--text">LOGIN</h1></center>
        <div style="width: 50%; margin-left: 25%; margin-top: 5%">
          <v-container>
            <v-form class="login-form">
              <v-text-field
                label="Employee ID"
                outlined
                prepend-inner-icon="mdi-account"
                dense
              ></v-text-field>

              <v-text-field
                label="Password"
                type="password"
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
export default {
  data() {
    return {
      img_log: logo,
      display: false,
      msg: "",
      isActive: false,
      Isloading:false
    };
  },
  components: {
    ErrorMsg,
  },
  methods: {
    login() {
      // this.msg = "Invalid UserName Password"
      // this.isActive = true;
      // setTimeout(()=>{
      //   this.isActive = false
      // },3000)
      this.Isloading = true;

      setTimeout(()=>{
        this.Isloading = false
        this.$route.push('/')
      },1000)
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