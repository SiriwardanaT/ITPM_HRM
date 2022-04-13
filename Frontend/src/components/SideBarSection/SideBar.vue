<template>
  <v-navigation-drawer dark color="cyan darken-3 white--text" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          <img :src="img_src" alt="" />
          <p>{{AppName}}</p>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav style="margin-top: 20px">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="navigate(item.to)"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <div class="ma-5">
        <p style="font-size:12px">Developed By ITPM Team</p>
    </div>
  </v-navigation-drawer>
</template>

<script>
import logo from "../../../public/logo1.png";
import AppOptions from '../../components/SideBarSection/SideBarOptionItems'
import authHelper from '../../services/authHelpers'
export default {
  data: () => ({
    AppName:"RASA PVT",
    img_src: logo,
    items:"",
    right: null,
  }),
  methods: {
    navigate(to) {
      this.$router.push(to.toLocaleLowerCase());
    },
  },
  mounted(){
     var admin = authHelper.getAdminStatus();
     if(admin == true){
        this.items = AppOptions.item
     }
     else{
       this.items = AppOptions.userItems
     }
     
  }
};
</script>

<style></style>
