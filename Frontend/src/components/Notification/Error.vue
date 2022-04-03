<template>
  <div class="text-center">
    
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      centered
      top
      right
      color="red accent-2"
    >
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    data: () => ({
      snackbar: true,
      text: 'Invalid username or password',
    }),
    props:{
        msg:String,
        isActive:Boolean
    }
  }
</script>