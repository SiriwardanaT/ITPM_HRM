<template>
  <v-card
    class="mx-auto"
    :color="color"
    dark
    style="height:120px;margin-top:12px"
  >
    <v-card-title>
      <v-icon
        large
        left
        style="font-size:50px"
      >
        {{icon}}
      </v-icon>
      <span class="text-h6 font-weight-light">{{title}}</span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
       {{description}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    props:{
        title:String,
        icon :String,
        color:String,
        description :String
    }
}
</script>

<style>

</style>





