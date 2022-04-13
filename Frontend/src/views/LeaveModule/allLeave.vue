<template>
  <v-container>
    <div class="top-section">
      <h2>Leave Types</h2>
      <v-row>
        <v-col cols="9">
          
        </v-col>
        <v-col>
          <v-btn @click="addLeave()" class="teal lighten-2 white--text"> Add New Leave Type </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- table section -->
    <div class="table-section">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Leave Name</th>
              <th class="text-left">Annual leaves</th>
              <th class="text-left">Monthly leaves</th>
              <th class="text-left">Salary Deduct</th>
              <th class="text-left">Description</th>
              <th class="text-left">Applicable people</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Casual Leave</td>
              <td>12</td>
              <td>1</td>
              <td>Yes</td>
              <td>dhs sjdhsj sdhsj jddhdsj</td>
              <td>all</td>
             
              <td>
                <v-icon small class="mr-2" @click="editLeave(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="ml-4" @click="editItem(item)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    addLeave() {
      this.$router.push("/leave/add");
    },
     editLeave() {
      this.$router.push("/leave/update");
    },
  },
};
</script>

<style>
.table-section {
  margin-top: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.top-section {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
