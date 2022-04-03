<template>
  <v-container>
    <div class="top-section">
      <v-row>
        <v-col cols="9">
          <h1>Employee List</h1>
        </v-col>
        <v-col>
          <v-btn class="teal lighten-2 white--text"> Add Employee </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- table section -->
    <div class="table-section">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Employee Name</th>
              <th class="text-left">Email</th>
              <th class="text-left">phone</th>
              <th class="text-left">Gender</th>
              <th class="text-left">Status</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tharindu Harshana</td>
              <td>thari@gmail.com</td>
              <td>0762930117</td>
              <td>Male</td>
              <td>
                <v-chip
                  outlined
                  small
                  color="green accent-2 white--text"
                  pill
                  class="ma-3"
                >
                  Active
                </v-chip>
              </td>
              <td>
                <v-icon small class="mr-2" @click="editItem(item)">
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
export default {};
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