<template>
  <div>
    <v-container>
      <v-row>
     
          <h2
            class="mt-15 pb-6 black--text"
            v-if="this.$route.path == '/leave/update'"
          >
            Update Leave Type
          </h2>
        
        
          <h2
            class="mt-15 pb-6 black--text"
            v-if="this.$route.path == '/leave/add'"
          >
            Add Leave Type
          </h2>
       
      </v-row>

      <v-row>
        <Forms />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Forms from "../../views/LeaveModule/form.vue";
export default {
  data() {
    return {};
  },
  components: {
    Forms,
  },
};
</script>

