<template>
  <v-app>
    <v-main>
    <TopBar/>
    <router-view/>
    <SideBar/>
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
