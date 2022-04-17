<template>
  <v-dialog v-model="dialogDetails" persistent width="400">
    <v-card height="55vh">
      <v-icon class="redAlert-icon" color="red" size="100">
        mdi-close-circle
      </v-icon>
      <v-icon class="close-icon" @click="dialogDetails = false">
        mdi-close
      </v-icon>
      <v-card-title class="mainTitle">
        <h3>Are you sure ?</h3>
      </v-card-title>
      <div class="deleteContent">
        <h5>
          Do you really want to delete these records? This process cannot be
          undone.
        </h5>
      </div>

      <v-card-actions>
        <v-btn
          class="deleteBtn"
          color="red white--text darken-1"
          @click="$emit('doDelete')"
        >
          Delete
        </v-btn>
        <v-btn
          class="closeBtn"
          color="#A0A0A0 white--text darken-1"
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
    return {};
  },
  props: {
    dialogDetails: Boolean,
  },
};
</script>
<style>
.redAlert-icon {
  position: absolute;
  top: 6%;
  left: 38%;
}
.close-icon {
  position: absolute;
  top: -5%;
  left: 65%;
}
.mainTitle {
  position: absolute;
  top: 33%;
  left: 23%;
  color: #404040;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.deleteContent {
  position: absolute;
  top: 53%;
  left: 3%;
  color: #a8a8a8;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.deleteBtn {
  position: absolute;
  left: 15%;
  top: 75%;
  width: 120px;
}
.closeBtn {
  position: absolute;
  right: 15%;
  top: 75%;
  width: 120px;
}
</style>
