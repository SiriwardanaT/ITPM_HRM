<template>
  <v-app class="app">
    <v-main>
    <TopBar v-if="this.$route.name != 'Login'"/>
    <router-view/>
    <SideBar v-if="this.$route.name != 'Login'"/>
    </v-main>
  </v-app>
</template>
<script>

import TopBar from '../src/components/TopNavigationBar/TopBar.vue'
import SideBar from '../src/components/SideBarSection/SideBar.vue'
export default {
  name: 'App',
  components:{
    TopBar,
    SideBar
  }
};
</script>

<style>


</style>
