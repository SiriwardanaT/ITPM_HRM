<template>
  <div>
    <v-container>
      <v-row>
        <center>
          
        </center>
        <center>
          <h2
            class="mt-15 pb-6 black--text"
             
          >
            Apply For a leave
          </h2>
        
        </center>
      </v-row>

      <v-row>
        <Forms />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Forms from "../UserRequestLeave/leaveForm.vue";
export default {
  data() {
    return {};
  },
  components: {
    Forms,
  },
};
</script>

<style></style>
