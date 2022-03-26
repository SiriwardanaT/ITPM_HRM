<template>
  <v-app-bar   elevation="2">
    <h1 class="pa-3" style="font-family: 'Nunito Sans', sans-serif">HRM</h1>

    <v-chip outlined small color="cyan darken-3 white--text" pill class="ma-3">
      <v-icon class="ma-1" small>mdi-domain</v-icon>
      Add Employee
    </v-chip>
    <v-chip outlined small color="cyan darken-3 white--text" pill class="ma-3">
      <v-icon class="ma-1" small>mdi-domain</v-icon>
     Job Roles
    </v-chip>

    <v-chip
      outlined
      @click="navigate"
      small
      color="cyan darken-3 white--text"
      pill
      class="ma-3"
    >
      <v-icon  class="ma-1" small>mdi-calendar-account</v-icon>
      All Reports
    </v-chip>

    <v-chip outlined small color="cyan darken-3 white--text" pill class="ma-3">
      <v-icon class="ma-1" small>mdi-calendar-account</v-icon>
      Leave Types
    </v-chip>
    <div style="margin-top:30px">
        <v-text-field
            small
            solo
            label="Search Employee"
            prepend-inner-icon="mdi-calendar-account"
          ></v-text-field>
    </div>
    <v-spacer></v-spacer>
    <div class="ma-3">
       <p style="font-size:14px">Tharindu ({{admin}})</p>
    </div>
    <v-avatar color="red" v-cloak>
      <span class="white--text text-h5">CJ</span>
    </v-avatar>    
  </v-app-bar>
</template>

<script>
export default {
  data(){
    return{
      admin:"Admin"
    }
  }
};
</script>

<style></style>
