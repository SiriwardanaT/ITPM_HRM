<template>
  <v-dialog v-model="dialogDetails"  persistent width="600">
    <v-card height="25vh">
      <v-icon class="red-icon" color="red"> mdi-alert-circle </v-icon>
      <v-icon class="close-icon"> mdi-close-circle-outline </v-icon>
      <v-card-title class="justify-center">
        <h5>Are you sure you want to delete this record ?</h5>
      </v-card-title>

      <v-card-actions>
        <v-btn
          class="delete"
          color="red white--text darken-1"
          @click="deleteRecord(leaveId)"
        >
          Delete
        </v-btn>
        <v-btn
          class="close"
          color="green white--text darken-1"
          @click="dialogDetails = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      props:{
        dialogDetails:Boolean
      }
    };
  },
};
</script>
