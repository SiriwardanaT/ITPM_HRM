<template>
  <v-container>
    <h2>Add Employee</h2>
    <v-row> </v-row>
    <!-- form start -->
    <div class="form-sec">
      <!-- ------------------Basic informatin section --------------------------- -->
      <div class="mb-3 sub-header-basic">
        <v-chip style="width: 50%">Basic Information</v-chip>
      </div>
      <v-row>
        <v-col>
          <v-text-field label="Employee Name" outlined dense></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Phone Number"
            type="number"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Email Address" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="NIC" outlined dense></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Data Of Birth" outlined dense></v-text-field>
        </v-col>
        <v-col>
          <v-select
            :items="GenderItems"
            label="Gender"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Address" outlined dense></v-text-field>
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
                :items="GenderItems"
                label="Select Job Role"
                dense
                outlined
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
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
        <!-- button section  -->
        <div class="button-section">
          <v-btn class="teal lighten-2 white--text" style="width: 25%">
            Save
          </v-btn>
          <v-btn class="ma-2 white--text" style="width: 10%"  color="orange">
            Clear
          </v-btn>
        </div>
      </div>
    </div>
    <Loader v-if="Isloading" />
  </v-container>
</template>

<script>
import Loader from "../../components/Notification/Loading.vue";
export default {
  data() {
    return {
      Isloading: true,
      GenderItems: ["Male", "Female"],
    };
  },
  components: {
    Loader,
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