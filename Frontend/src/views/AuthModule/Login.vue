<template>

   <div>
   <!-- left side view -->
   <v-row>
        <v-col cols="4" class="cyan" style="height:100vh">
            <center><h1 class="mt-4 white--text">HRM</h1></center>
            <img :src="img_log" alt="" height="200" style="margin-top:20%;margin-left:25%">
        </v-col>
        <!-- right side view -->
        <v-col>
            <center><h1 class="mt-7 black--text">LOGIN</h1></center>
            <div style="width:50%;margin-left:25%;margin-top:5%">
                <v-container>
                    
                <v-form>
                 
                   <v-text-field
                        label="Employee Id"
                        outlined
                        prepend-inner-icon="mdi-account"
                        dense
                    ></v-text-field>
          
           <v-text-field
                        label="Password"
                        type="password"
                        prepend-inner-icon="mdi-lock"
                        outlined
                        dense
                    ></v-text-field>
                    <v-btn class="teal lighten-2 white--text" style="width:100%">
                        Login
                    </v-btn>
                </v-form>
                </v-container>
            </div>
        </v-col>
    </v-row>
   </div>
     
   
    

   
</template>

<script>
import logo from '../../../public/logo1.png'
export default {
   data(){
       return{
            img_log :logo
       }
   }
}
</script>

<style>

</style>